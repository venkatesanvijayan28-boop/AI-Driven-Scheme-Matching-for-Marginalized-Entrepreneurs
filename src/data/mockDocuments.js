export const INITIAL_DOCUMENTS = [
  {
    id: 'doc-identity',
    title: 'Identity Proof (Aadhaar Card / Voter ID)',
    category: 'KYC & Personal Identity',
    isMandatory: true,
    description: 'Government issued photo identity with full name and Date of Birth matching applicant details.',
    status: 'ready', // 'ready' | 'pending' | 'missing'
    fileType: 'PDF / JPEG',
    fileName: 'Aadhaar_Verified_Doc.pdf',
    uploadedAt: '24 Aug 2026',
    verified: true,
    requiredFor: ['PMEGP', 'Stand-Up India', 'MUDRA', 'PMFME', 'CGTMSE', 'PM Vishwakarma'],
    guidelines: 'Ensure all 12 digits of Aadhaar are clearly legible and the mobile number is active for OTP verification.'
  },
  {
    id: 'doc-income',
    title: 'Income / Category Certificate',
    category: 'Eligibility Verification',
    isMandatory: true,
    description: 'Revenue authority or Tehsildar issued certificate verifying annual family income and category (SC/ST/OBC/EWS).',
    status: 'ready',
    fileType: 'PDF',
    fileName: 'Income_Category_Cert_2026.pdf',
    uploadedAt: '25 Aug 2026',
    verified: true,
    requiredFor: ['PMEGP', 'Stand-Up India', 'PMFME', 'NSSH Scheme', 'PM Vishwakarma'],
    guidelines: 'Certificate must have a valid digital barcode and be issued within the last 12 months.'
  },
  {
    id: 'doc-bank',
    title: 'Bank Account Passbook & 6M Statement',
    category: 'Financial Details',
    isMandatory: true,
    description: 'Aadhaar-seeded savings/current account passbook first page showing IFSC, account number and last 6 months activity.',
    status: 'ready',
    fileType: 'PDF',
    fileName: 'Bank_Statement_6M_SBI.pdf',
    uploadedAt: '26 Aug 2026',
    verified: true,
    requiredFor: ['PMEGP', 'Stand-Up India', 'MUDRA', 'PMFME', 'CGTMSE', 'Startup Seed Fund'],
    guidelines: 'Bank account must be active in a Scheduled Commercial or Regional Rural Bank.'
  },
  {
    id: 'doc-address',
    title: 'Business / Residential Address Proof',
    category: 'KYC & Location Verification',
    isMandatory: true,
    description: 'Electricity bill / Rent agreement / Property tax receipt verifying rural or urban local body address.',
    status: 'ready',
    fileType: 'PDF / JPG',
    fileName: 'Electricity_Bill_Premises.pdf',
    uploadedAt: '27 Aug 2026',
    verified: true,
    requiredFor: ['PMEGP', 'Stand-Up India', 'PMFME', 'MUDRA', 'CGTMSE'],
    guidelines: 'Utility bill should not be older than 3 months from the date of submission.'
  },
  {
    id: 'doc-udyam',
    title: 'Udyam MSME Registration Certificate',
    category: 'Business Registration',
    isMandatory: false,
    description: 'Self-declaration based online MSME registration issued by Ministry of MSME.',
    status: 'pending', // Pending action / needs upload
    fileType: 'PDF',
    fileName: null,
    uploadedAt: null,
    verified: false,
    requiredFor: ['CGTMSE', 'PMEGP', 'NSSH Scheme', 'MUDRA Tarun'],
    guidelines: 'Free registration at udyamregistration.gov.in using Aadhaar and GSTIN (if applicable).',
    actionLink: 'https://udyamregistration.gov.in/'
  },
  {
    id: 'doc-dpr',
    title: 'Detailed Project Report (DPR) & Cost Estimates',
    category: 'Project Feasibility',
    isMandatory: false,
    description: 'Comprehensive business proposal with machinery quotations, working capital requirements, break-even analysis, and financial projections.',
    status: 'missing', // Missing document
    fileType: 'PDF / DOCX',
    fileName: null,
    uploadedAt: null,
    verified: false,
    requiredFor: ['PMEGP', 'Stand-Up India', 'PMFME', 'Startup Seed Fund', 'CGTMSE'],
    guidelines: 'You can use the AI DPR Generator tool or request assistance from a District Resource Person (DRP) at District Industries Centre.'
  }
];
