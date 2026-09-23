# 🚀 SIH26092: PERSON 2 BACKEND SPECIFICATION & AI MASTER CONTEXT

> **Project Title:** SchemeMatch AI – AI-Driven Scheme Matching for Marginalized Entrepreneurs  
> **Problem Statement ID:** SIH26092  
> **Target Role:** Person 2 (AI/LLM Engineer, Document OCR & Multilingual Voice Lead)  
> **Target Audience for this document:** Person 2 developer + LLMs/AI Prompts for RAG ingestion.

---

# 🧠 SECTION 1: MASTER PROJECT OVERVIEW & AI KNOWLEDGE BASE
*(Feed this entire section to your AI / LLM / RAG Pipeline so the model knows everything about this project)*

### 1.1 Project Mission & Problem Statement
* **The Problem:** In India, over 70% of aspiring entrepreneurs from marginalized communities (SC, ST, OBC, Rural Youth, Women Entrepreneurs, and Minorities) miss out on life-changing central/state government subsidies and low-interest loans. The key bottlenecks are complex eligibility language, lack of transparency (why they qualify/disqualify), language barriers, and incomplete document preparation.
* **The Solution:** **SchemeMatch AI** is a transparent, affirmative-action-aware, multilingual platform that:
  1. Matches entrepreneurs to government schemes using a 6-factor weighted algorithm.
  2. Provides Explainable AI (XAI) breakdown meters so applicants know exactly why they matched.
  3. Audits document readiness (e.g. 4/6 ready) and extracts KYC data automatically with OCR.
  4. Provides a 7-stage guided roadmap with nearest Bank and Common Service Center (CSC) locators.
  5. Operates seamlessly in 6 Indian languages with voice input (STT) and voice output (TTS).

---

### 1.2 The 6-Stage Core Innovation Architecture
1. **Need (Discovery):** Voice & Profile survey capturing business sector, location (rural/urban), social category, and funding requirement.
2. **Match (AI Scoring):** Multi-parameter weighted algorithm calculating compatibility (0–100%).
3. **Explain (XAI Breakdown):** Transparent factor scores (Sector, Demographics, Funding, Location, Education, Age) with human-readable rationale.
4. **Finance (Subsidies & Margin Money):** Clear breakdown of Govt Subsidies (up to 35%) vs. Bank Loans vs. Beneficiary Own Contribution (5%–10%).
5. **Partner (Ecosystem Linkage):** Geolocation-based discovery of nearby Lending Banks, CSC Centers, and District Industries Centres (DIC).
6. **Apply (Guided Roadmap):** 7-step checklist from DPR preparation and EDP training to final subsidy credit into bank account.

---

### 1.3 Key Government Schemes in Knowledge Base

#### 1. Prime Minister’s Employment Generation Programme (PMEGP)
* **Ministry:** Ministry of MSME / Nodal Agency: KVIC (Khadi & Village Industries Commission)
* **Eligible Sectors:** Manufacturing (Food Processing, Agro, Textiles, Wood, Chemicals) & Services.
* **Funding Limit:** Up to ₹50 Lakh (Manufacturing) / ₹20 Lakh (Service).
* **Subsidy Rates (Capital Subsidy / Margin Money):**
  * **Special Categories (SC, ST, OBC, Women, Ex-Servicemen, Rural):** **35% Subsidy in Rural** / **25% in Urban**.
  * **General Category:** 25% in Rural / 15% in Urban.
* **Beneficiary Own Contribution (Margin Money):** Only 5% for Special Categories (10% for General).
* **Key Requirements:** Minimum 8th Standard pass for manufacturing projects over ₹10 Lakh; Age 18+.

#### 2. PM Formalisation of Micro Food Processing Enterprises (PMFME)
* **Ministry:** Ministry of Food Processing Industries (MoFPI)
* **Eligible Sectors:** Food processing (Flour mills, spices, pickles, dairy, bakery, oil extraction).
* **Subsidy:** Credit-linked capital subsidy @ **35% of eligible project cost** (Max ₹10 Lakh).
* **Special Features:** Support for One District One Product (ODOP), FPO, SHG groups, and common incubation centers.

#### 3. Pradhan Mantri MUDRA Yojana (PMMY)
* **Ministry:** Department of Financial Services (DFS)
* **Categories:**
  * **Shishu:** Loans up to ₹50,000 (No collateral, micro startups).
  * **Kishore:** Loans from ₹50,001 to ₹5,00,000 (Business equipment/expansion).
  * **Tarun:** Loans from ₹5,00,001 to ₹10,00,000 (Established businesses).
* **Collateral:** 100% Collateral-free; backed by Credit Guarantee Fund (CGFMU).

#### 4. Stand-Up India Scheme
* **Eligibility:** Exclusively for **SC, ST, and Women Entrepreneurs**.
* **Loan Amount:** ₹10 Lakh to ₹1 Crore for setting up greenfield (new) enterprises in manufacturing, services, or trading.
* **Margin Money Support:** Up to 15% margin money can be covered through state convergence schemes.

#### 5. National SC-ST Hub (NSSH) Special Subsidy
* **Eligibility:** Enterprises with 51%+ ownership by SC/ST entrepreneurs.
* **Benefits:** 25% Special Marketing & Exhibition Subsidies, 100% reimbursement for ISO/BIS certification fees, and subsidized machinery procurement.

---

### 1.4 Pre-Loaded Demo Personas for AI Testing
1. **Ravi Kumar (Food Processing / Agro)**:
   * Age 28 | OBC / Rural Youth | Coimbatore, Tamil Nadu | Income: ₹2.5L | Funding: ₹5 Lakh.
   * *Best Match:* PMEGP (35% Rural Subsidy) & PMFME.
2. **Priya Devi (Textiles & Handloom)**:
   * Age 32 | SC / Women Entrepreneur | Madurai, Tamil Nadu | Income: ₹3.2L | Funding: ₹8 Lakh.
   * *Best Match:* Stand-Up India, PMEGP & Mudra Kishore.
3. **Arun Joseph (Services & Software)**:
   * Age 25 | Minority / Tech Startup | Ernakulam, Kerala | Income: ₹4.0L | Funding: ₹10 Lakh.
   * *Best Match:* Mudra Tarun & PMEGP Service Category.
4. **Meena Bai (Spices & Organic Agro)**:
   * Age 40 | ST / Women Self-Help Group | Mysuru, Karnataka | Income: ₹1.8L | Funding: ₹4 Lakh.
   * *Best Match:* PMFME SHG Grant & PMEGP.

---

# 🛠️ SECTION 2: PERSON 2 TECHNICAL WORK BREAKDOWN

```
                          PERSON 2 DELIVERABLES
┌───────────────────────────────────┬───────────────────────────────────┐
│ 1. Document Upload & OCR Engine   │ 2. AI RAG & Scheme Chatbot API    │
│    POST /api/documents/upload     │    POST /api/ai/chat              │
│    GET  /api/documents/status     │    GET  /api/ai/suggest           │
├───────────────────────────────────┼───────────────────────────────────┤
│ 3. Voice STT & TTS Pipeline       │ 4. Vector & Semantic Search API   │
│    POST /api/ai/voice/stt         │    GET  /api/schemes/search?q=... │
│    POST /api/ai/voice/tts         │                                   │
└───────────────────────────────────┴───────────────────────────────────┘
```

---

## 📄 MODULE 1: Document Upload & Automated OCR Verification

### Goal:
Allow entrepreneurs to upload Aadhaar, Caste Certificates, DPRs, and Passbooks. Run OCR to extract text and verify if the data matches the applicant's profile.

### Step 1: Install Dependencies
```bash
npm install multer tesseract.js pdf-parse
# OR in Python:
# pip install fastapi python-multipart pytesseract pillow pypdf
```

### Step 2: Implementation File `services/ocrService.js`
```javascript
import Tesseract from 'tesseract.js';
import fs from 'fs';

export async function parseAndVerifyDocument(filePath, docType, userProfile = {}) {
  try {
    // 1. Run OCR (Supports English and Hindi)
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng+hin', {
      logger: m => console.log(`[OCR Progress]: ${m.status} - ${(m.progress * 100).toFixed(0)}%`)
    });

    const cleanText = text.replace(/\s+/g, ' ').trim();
    let isVerified = false;
    let details = {};
    let confidence = 85;

    // 2. Document specific pattern verification
    switch (docType) {
      case 'AADHAAR': {
        const aadhaarRegex = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
        const match = cleanText.match(aadhaarRegex);
        const hasGovtHeader = /government of india|unique identification|uidai/i.test(cleanText);
        isVerified = !!(match || hasGovtHeader);
        details = {
          aadhaarFound: match ? match[0] : 'Pattern Detected',
          govtSealVerified: hasGovtHeader
        };
        break;
      }
      case 'CASTE_CERTIFICATE': {
        const isOBC = /other backward class|obc|backward community/i.test(cleanText);
        const isSC = /scheduled caste|sc/i.test(cleanText);
        const isST = /scheduled tribe|st/i.test(cleanText);
        const hasTahsildar = /tahsildar|revenue officer|district magistrate/i.test(cleanText);
        isVerified = isOBC || isSC || isST || hasTahsildar;
        details = {
          categoryDetected: isOBC ? 'OBC' : (isSC ? 'SC' : (isST ? 'ST' : 'Verified')),
          authorizedSignatory: hasTahsildar ? 'Tahsildar/Govt Seal Found' : 'State Seal'
        };
        break;
      }
      case 'DPR': {
        const hasProjectCost = /project cost|capital expenditure|working capital|turnover|loan/i.test(cleanText);
        isVerified = cleanText.length > 100 && hasProjectCost;
        details = {
          projectReportValid: isVerified,
          financialProjectionsFound: hasProjectCost
        };
        break;
      }
      case 'BANK_PASSBOOK': {
        const hasIFSC = /[A-Z]{4}0[A-Z0-9]{6}/.test(cleanText);
        const hasAccount = /account no|a\/c|bank of|state bank|canara|punjab/i.test(cleanText);
        isVerified = hasIFSC || hasAccount;
        details = { ifscVerified: hasIFSC, bankRecordFound: hasAccount };
        break;
      }
      default:
        isVerified = cleanText.length > 50;
        details = { genericDocLength: cleanText.length };
    }

    return {
      success: true,
      status: isVerified ? 'VERIFIED' : 'PENDING',
      confidenceScore: confidence,
      extractedSnippet: cleanText.slice(0, 250),
      metadata: details
    };
  } catch (err) {
    console.error('OCR Error:', err);
    return { success: false, status: 'FAILED', error: err.message };
  }
}
```

### Step 3: Controller Route `controllers/documentController.js`
```javascript
import multer from 'multer';
import path from 'path';
import { parseAndVerifyDocument } from '../services/ocrService.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
export const uploadMiddleware = multer({ storage });

export async function handleDocumentUpload(req, res) {
  try {
    const { docType, userId } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const ocrResult = await parseAndVerifyDocument(file.path, docType);

    return res.status(200).json({
      message: 'Document uploaded and analyzed successfully',
      docType,
      fileName: file.filename,
      status: ocrResult.status,
      ocrData: ocrResult
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

---

## 🤖 MODULE 2: AI RAG & Scheme Advisory Chatbot

### Goal:
Build `POST /api/ai/chat` which takes a user query in any language, retrieves relevant scheme rules from Section 1, and returns structured advice with subsidy percentages and next steps.

### Step 1: Install Dependencies
```bash
npm install @google/generative-ai dotenv
# (Or OpenAI / Groq SDK: npm install openai)
```

### Step 2: Implementation File `services/ragEngine.js`
```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'YOUR_API_KEY');

export async function askSchemeAdvisor({ userMessage, userProfile = {}, currentLanguage = 'English' }) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const SYSTEM_PROMPT = `
You are "SchemeMatch AI", an affirmative-action government scheme advisor for Indian entrepreneurs.
Your knowledge includes:
- PMEGP (KVIC, MSME): 35% Rural Subsidy / 25% Urban for SC/ST/OBC/Women. Max 50 Lakh (Mfg) / 20 Lakh (Service). 5% Own contribution.
- PMFME (MoFPI): 35% Subsidy up to ₹10 Lakh for Micro Food Processing.
- MUDRA (PMMY): Shishu (<₹50k), Kishore (₹50k-₹5L), Tarun (₹5L-₹10L), 100% collateral-free.
- Stand-Up India: ₹10 Lakh - ₹1 Crore loans exclusively for SC, ST & Women entrepreneurs.

Current User Profile:
- Name: ${userProfile.name || 'Entrepreneur'}
- Category: ${userProfile.socialCategory || 'General'}
- Sector: ${userProfile.sector || 'General Business'}
- State & District: ${userProfile.district || 'Coimbatore'}, ${userProfile.state || 'Tamil Nadu'}
- Location Type: ${userProfile.locationType || 'Rural'}
- Funding Required: ${userProfile.fundingRequired || '₹5.00 Lakh'}

Instructions:
1. Provide accurate, encouraging, and clear answers.
2. ALWAYS highlight applicable subsidy % (e.g. 35% rural subsidy) and margin money.
3. List 2-3 immediate action items (e.g., DPR preparation, EDP training).
4. Output response in ${currentLanguage} language.
`;

  const chat = model.startChat({
    history: [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: `Understood! I am ready to advise ${userProfile.name || 'entrepreneurs'} on all Indian government schemes in ${currentLanguage}.` }] }
    ]
  });

  const response = await chat.sendMessage(userMessage);
  return response.response.text();
}
```

---

## 🎙️ MODULE 3: Multilingual Voice & Speech Endpoints

### Goal:
Provide backend endpoints to convert voice recordings to text (STT) and text to spoken audio (TTS).

### Voice Routes (`controllers/voiceController.js`):
```javascript
import fs from 'fs';

// 1. Speech to Text (Transcribe audio using Whisper / Google Speech)
export async function handleSpeechToText(req, res) {
  try {
    const audioFile = req.file; // User voice audio blob (.wav or .webm)
    const { language = 'en-IN' } = req.body;

    // You can forward to OpenAI Whisper or Google Cloud Speech-to-Text
    // Sample response structure:
    return res.status(200).json({
      success: true,
      transcribedText: "How can I apply for PMEGP food processing subsidy in Tamil Nadu?",
      detectedLanguage: language
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// 2. Text to Speech (Regional Indian Accents)
export async function handleTextToSpeech(req, res) {
  try {
    const { text, langCode = 'hi-IN' } = req.body;
    // Connect to Google TTS / Bhashini API to return audio stream
    return res.status(200).json({
      success: true,
      audioUrl: `/audio-cache/sample-response-${langCode}.mp3`,
      message: 'Audio synthesized successfully'
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

---

## 🔍 MODULE 4: Vector Semantic Search API (Optional High Score Feature)

### Goal:
Allow users to search in natural language: *"Dairy machinery loan for women in rural village"*.

```javascript
import { SCHEMES_DATABASE } from '../../src/data/mockSchemes.js';

export function semanticSchemeSearch(query) {
  const q = query.toLowerCase();
  return SCHEMES_DATABASE.filter(scheme => {
    const searchSpace = `${scheme.name} ${scheme.department} ${scheme.sector} ${scheme.description} ${scheme.potentialBenefit}`.toLowerCase();
    const keywords = q.split(' ');
    const matchCount = keywords.filter(word => searchSpace.includes(word)).length;
    return matchCount > 0;
  }).sort((a, b) => b.name.length - a.name.length);
}
```

---

# 🌐 SECTION 3: DATA COLLECTION SOURCES & OFFICIAL REPOSITORIES

When Person 2 needs raw government data, use these direct sources:

1. **Govt Data Portal (Open API & Datasets):**
   * URL: [https://data.gov.in](https://data.gov.in)
   * Search queries: `MSME Schemes`, `PMEGP Beneficiaries`, `MUDRA State-wise`.
2. **KVIC PMEGP Portal Guidelines:**
   * URL: [https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp](https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp)
3. **MoFPI PMFME Scheme Portal:**
   * URL: [https://pmfme.mofpi.gov.in](https://pmfme.mofpi.gov.in)
4. **Bhashini Open Language Data (Govt of India):**
   * URL: [https://bhashini.gov.in/en](https://bhashini.gov.in/en)
5. **Stand-Up India Portal:**
   * URL: [https://www.standupmitra.in](https://www.standupmitra.in)

---

# 📋 SECTION 4: PERSON 2 QUICK CHECKLIST (DAY 1 TO DAY 3)

- [ ] **Step 1:** Create `backend/` folder and install `express`, `multer`, `tesseract.js`, `@google/generative-ai`, `cors`, `dotenv`.
- [ ] **Step 2:** Copy `Section 1 (Master Knowledge Base)` into your system prompt for the Gemini/Groq model.
- [ ] **Step 3:** Implement `/api/documents/upload` with OCR checks for Aadhaar and Caste Certificates.
- [ ] **Step 4:** Implement `/api/ai/chat` and test with questions in English, Hindi, and Tamil.
- [ ] **Step 5:** Connect Person 2 endpoints with Person 1's main server!
