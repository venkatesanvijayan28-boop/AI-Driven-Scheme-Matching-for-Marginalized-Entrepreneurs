import { createWorker } from 'tesseract.js';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/bmp',
  'image/tiff',
  'application/pdf'
];

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

/**
 * Keyword dictionaries and regex patterns for official Indian entrepreneur documents
 */
const DOCUMENT_SIGNATURES = {
  aadhaar: {
    name: 'Aadhaar Card',
    keywords: ['government of india', 'unique identification', 'aadhaar', 'uidai', 'mera aadhaar', 'enrollment', 'dob', 'father', 'male', 'female'],
    regex: /\b\d{4}\s?\d{4}\s?\d{4}\b/
  },
  pan: {
    name: 'PAN Card',
    keywords: ['income tax department', 'permanent account number', 'govt of india', 'father\'s name', 'date of birth'],
    regex: /[A-Z]{5}[0-9]{4}[A-Z]/
  },
  income_caste: {
    name: 'Income & Community Certificate',
    keywords: ['income certificate', 'caste certificate', 'community certificate', 'tahsildar', 'revenue', 'taluk', 'district magistrate', 'backward class', 'scheduled caste', 'scheduled tribe', 'annual income', 'rs.'],
    regex: /(income|caste|community|tahsildar|revenue|rs\.?\s*\d+)/i
  },
  bank_passbook: {
    name: 'Bank Passbook / Statement',
    keywords: ['account number', 'ifsc', 'branch', 'savings account', 'current account', 'bank', 'passbook', 'statement', 'customer id', 'balance'],
    regex: /(a\/c|account\s*(no|number)|ifsc\s*code|branch|cif)/i
  },
  address_proof: {
    name: 'Address Proof / Ration / Electricity',
    keywords: ['electricity', 'consumer number', 'ration card', 'civil supplies', 'voter id', 'election commission', 'epic', 'driving licence', 'address'],
    regex: /(consumer\s*no|epic|ration|electricity|bill|address)/i
  },
  udyam: {
    name: 'Udyam Registration Certificate',
    keywords: ['udyam', 'registration certificate', 'ministry of micro', 'msme', 'enterprises', 'enterprise type', 'national industry classification', 'nic code'],
    regex: /UDYAM-[A-Z]{2}-\d{2}-\d{7}/i
  },
  project_report: {
    name: 'Detailed Project Report (DPR)',
    keywords: ['detailed project report', 'project cost', 'means of finance', 'subsidy', 'margin money', 'term loan', 'working capital', 'financial forecast', 'break-even'],
    regex: /(project\s*cost|means\s*of\s*finance|detailed\s*project\s*report|dpr)/i
  }
};

/**
 * Helper to mask sensitive identifiers (e.g. Aadhaar, PAN)
 */
function maskIdentifier(val, type) {
  if (!val) return null;
  const str = String(val).replace(/\s/g, '');
  if (type === 'aadhaar' && str.length >= 12) {
    return `XXXX-XXXX-${str.slice(-4)}`;
  }
  if (type === 'pan' && str.length >= 10) {
    return `${str.slice(0, 2)}XXXXX${str.slice(-3)}`;
  }
  return str.length > 4 ? `***${str.slice(-4)}` : '****';
}

/**
 * Perform Optical Character Recognition (OCR) on an image buffer using Tesseract.js
 */
async function extractTextWithTesseract(fileBuffer) {
  let worker = null;
  try {
    worker = await createWorker('eng');
    const ret = await worker.recognize(fileBuffer);
    await worker.terminate();
    return {
      text: ret.data.text || '',
      confidence: Math.round(ret.data.confidence || 0)
    };
  } catch (err) {
    if (worker) {
      try { await worker.terminate(); } catch (e) {}
    }
    throw new Error(`OCR Processing failed: ${err.message}`);
  }
}

/**
 * POST /api/documents/verify
 * Accepts multipart/form-data with file or JSON with base64 dataUrl
 */
export async function verifyDocument(req, res) {
  try {
    let fileBuffer = null;
    let mimeType = null;
    let fileName = 'uploaded_doc';
    const documentType = (req.body.documentType || req.query.documentType || 'aadhaar').toLowerCase();

    // 1. Process uploaded file via multer or base64 dataUrl
    if (req.file) {
      fileBuffer = req.file.buffer;
      mimeType = req.file.mimetype;
      fileName = req.file.originalname;
    } else if (req.body.fileData) {
      // Support base64 dataUrl from React canvas / file reader
      const matches = req.body.fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        mimeType = matches[1];
        fileBuffer = Buffer.from(matches[2], 'base64');
      } else {
        fileBuffer = Buffer.from(req.body.fileData, 'base64');
        mimeType = req.body.mimeType || 'image/png';
      }
      fileName = req.body.fileName || 'uploaded_doc';
    } else {
      return res.status(400).json({
        verified: false,
        reason: 'No document file provided for verification. Please upload an image (JPG, PNG) or PDF.'
      });
    }

    // 2. Validate MIME Type
    if (mimeType && !ALLOWED_MIME_TYPES.includes(mimeType)) {
      return res.status(400).json({
        verified: false,
        reason: `Unsupported file format (${mimeType}). Please upload JPG, PNG, WEBP, or PDF.`
      });
    }

    // 3. Validate File Size
    if (fileBuffer.length > MAX_FILE_SIZE_BYTES) {
      return res.status(400).json({
        verified: false,
        reason: 'File size exceeds 10MB limit. Please upload a smaller compressed document.'
      });
    }

    if (fileBuffer.length < 500) {
      return res.status(400).json({
        verified: false,
        reason: 'Uploaded file is corrupted or empty (less than 500 bytes).'
      });
    }

    // 4. Extract Text using Real Tesseract OCR
    const ocrResult = await extractTextWithTesseract(fileBuffer);
    const extractedText = ocrResult.text.toLowerCase();
    const rawConfidence = ocrResult.confidence;

    // 5. Match against Document Signatures
    const targetDocKey = Object.keys(DOCUMENT_SIGNATURES).find(k => 
      documentType.includes(k) || k.includes(documentType)
    ) || 'aadhaar';

    const signature = DOCUMENT_SIGNATURES[targetDocKey] || DOCUMENT_SIGNATURES.aadhaar;

    let matchedKeywords = [];
    for (const kw of signature.keywords) {
      if (extractedText.includes(kw)) {
        matchedKeywords.push(kw);
      }
    }

    const regexMatch = signature.regex ? ocrResult.text.match(signature.regex) : null;
    const hasPattern = Boolean(regexMatch);

    // Calculation of verification confidence
    const keywordScore = Math.min(100, (matchedKeywords.length / 2) * 100);
    const totalConfidence = Math.round((rawConfidence * 0.4) + (keywordScore * 0.4) + (hasPattern ? 20 : 0));

    // Decision Logic: Requires at least 1 keyword or verified regex pattern and min 20% OCR confidence
    const isVerified = (matchedKeywords.length >= 1 || hasPattern) && rawConfidence > 15;

    let maskedId = null;
    if (regexMatch) {
      maskedId = maskIdentifier(regexMatch[0], targetDocKey);
    }

    if (!isVerified) {
      return res.status(200).json({
        verified: false,
        documentType: targetDocKey,
        confidence: Math.max(0.1, (totalConfidence / 100).toFixed(2)),
        reason: `Verification failed: Text extracted does not contain expected ${signature.name} security markers or details. Please ensure the document is clear and readable.`,
        checks: {
          keywordsDetected: matchedKeywords,
          patternMatched: hasPattern,
          ocrConfidence: rawConfidence
        }
      });
    }

    return res.status(200).json({
      verified: true,
      documentType: targetDocKey,
      documentName: signature.name,
      confidence: Math.min(0.99, Number((totalConfidence / 100).toFixed(2))),
      maskedIdentifier: maskedId,
      checks: {
        keywordsDetected: matchedKeywords,
        patternMatched: hasPattern,
        ocrQuality: rawConfidence >= 60 ? 'High' : 'Acceptable'
      },
      verifiedAt: new Date().toISOString()
    });

  } catch (err) {
    console.error('OCR Verification error:', err);
    return res.status(500).json({
      verified: false,
      reason: `Document verification service error: ${err.message}`
    });
  }
}
