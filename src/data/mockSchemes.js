export const SCHEMES_DATABASE = [
  {
    id: 'pmegp',
    name: 'Prime Minister’s Employment Generation Programme (PMEGP)',
    shortName: 'PMEGP',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    nodalAgency: 'KVIC (Khadi and Village Industries Commission)',
    sector: 'Manufacturing, Food Processing, Services & Rural Enterprise',
    sectorsList: ['Food Processing & Agro', 'Textiles & Handloom', 'Manufacturing', 'Services & Software', 'Retail & Trade'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)'],
    maxFunding: '₹50 Lakh (Manufacturing) / ₹20 Lakh (Service)',
    maxFundingNum: 5000000,
    minFundingNum: 100000,
    subsidyRate: 'Up to 35% in Rural (25% in Urban) for Special Categories (SC/ST/OBC/Women)',
    marginMoney: '5% own contribution for SC/ST/OBC/Women; 10% for General',
    status: 'High Match',
    description: 'A major credit-linked subsidy scheme aimed at generating employment through micro-enterprises in rural and urban areas.',
    potentialBenefit: 'Credit-linked capital subsidy up to 35% with bank loan facilitation and collateral-free support up to ₹10 Lakh.',
    whyMatchedReasons: [
      'Your business category (Manufacturing / Food / Handloom) is highly prioritized for capital subsidy.',
      'Location criteria match: Rural / Semi-urban units receive the highest subsidy band (35%).',
      'Target funding requirement is within the scheme ceiling (up to ₹50 Lakh).',
      'Social and gender category grants preferential 5% margin money contribution.',
      'Age and education requirement (Above 18 years & 8th pass for manufacturing > ₹10L) satisfied.'
    ],
    factorScores: {
      sectorMatch: 100,
      locationMatch: 95,
      incomeMatch: 90,
      fundingMatch: 95,
      stageMatch: 100,
      categoryMatch: 92
    },
    eligibilityRules: [
      { criterion: 'Age Requirement', value: '18+ years', status: 'pass', note: 'Applicant satisfies age requirement' },
      { criterion: 'Sector & Business Type', value: 'Manufacturing / Service', status: 'pass', note: 'Selected business model is eligible' },
      { criterion: 'Project Cost Limit', value: 'Up to ₹50 Lakh', status: 'pass', note: 'Funding required falls within ceiling' },
      { criterion: 'Education Requirement', value: 'Min 8th Standard for projects >₹10L', status: 'pass', note: 'Education qualification satisfied' },
      { criterion: 'Official KYC & Aadhaar Linkage', value: 'Aadhaar linked bank account', status: 'verify', note: 'Subject to bank KYC validation' }
    ],
    requiredDocuments: [
      'Identity Proof (Aadhaar / Voter ID)',
      'Caste / Social Category Certificate',
      'Detailed Project Report (DPR)',
      'Rural Area Certificate (issued by Village Panchayat)',
      'Educational Qualification Certificate',
      'Bank Passbook / Cancelled Cheque'
    ],
    applicationSteps: [
      'Submit online application on the official PMEGP / KVIC e-Portal',
      'Select District Level Task Force Committee (DLTFC) nodal branch',
      'Submit Project Report & Financial Forecast to the selected Financing Bank',
      'Complete 10-day Entrepreneurship Development Programme (EDP) training',
      'Bank sanctions loan and KVIC deposits margin money subsidy into TDR account'
    ],
    whereToApply: 'Online at pmegp.msme.gov.in or nearest KVIC/KVIB District Office & Nationalized Banks',
    officialPortal: 'https://pmegp.msme.gov.in/Home/HomePage',
    isSampleData: true
  },
  {
    id: 'nsfdc-micro-credit',
    name: 'NSFDC Micro Credit Scheme (MCS) for SC Beneficiaries',
    shortName: 'NSFDC Micro Credit',
    department: 'Ministry of Social Justice and Empowerment / NSFDC',
    nodalAgency: 'State Channelizing Agencies (SCAs), RRBs & NBFC-MFIs',
    sector: 'Micro Enterprises, Small Projects, Retail, Agro-Allied & Artisan Trades',
    sectorsList: ['Food Processing & Agro', 'Textiles & Handloom', 'Retail & Trade', 'Services & Software', 'Manufacturing'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)'],
    maxFunding: 'Up to ₹1.40 Lakh (90% Concessional Assistance)',
    maxFundingNum: 140000,
    minFundingNum: 10000,
    subsidyRate: 'Concessional Interest at 6.5% p.a. covering up to 90% of project cost',
    marginMoney: '10% Promoters Contribution (can be covered via State grants)',
    status: 'Strong Match',
    description: 'Provides quick concessional financial assistance up to ₹1.40 Lakh to Scheduled Caste (SC) beneficiaries having annual family income up to ₹5.00 Lakhs, routed through State Channelizing Agencies (SCAs), RRBs, and NBFC-MFIs with a 3-6 month moratorium period.',
    potentialBenefit: '90% project cost covered at an ultra-low concessional interest rate of 6.5% p.a. with 3-6 months moratorium period.',
    whyMatchedReasons: [
      'Target Beneficiary: Exclusively for Scheduled Caste (SC) individuals with family income up to ₹5.00 Lakhs.',
      'Project cost ceiling (up to ₹1.40 Lakh) fits small and micro-business requirements.',
      'Highly concessional interest rate of 6.5% per annum.',
      '3 to 6 months moratorium period prior to monthly repayment.',
      'Disbursed through authorized Channel Partners (SCAs, RRBs, NBFC-MFIs).'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 92,
      incomeMatch: 98,
      fundingMatch: 96,
      stageMatch: 95,
      categoryMatch: 100
    },
    eligibilityRules: [
      { criterion: 'Community Category', value: 'Scheduled Caste (SC) Citizen', status: 'pass', note: 'Applicant belongs to SC community' },
      { criterion: 'Income Ceiling', value: 'Family annual income up to ₹5.00 Lakhs', status: 'pass', note: 'Income threshold satisfied' },
      { criterion: 'Project Outlay', value: 'Up to ₹1.40 Lakh', status: 'pass', note: 'Micro-project requirement within ceiling' },
      { criterion: 'Channel Finance System', value: 'Routed through SCA / PSB / RRB / NBFC-MFI', status: 'verify', note: 'Channel partner selection required' }
    ],
    requiredDocuments: [
      'Community / Caste Certificate (SC Proof)',
      'Family Income Certificate (Up to ₹5.00 Lakhs)',
      'Aadhaar Card & Identity Proof',
      'Brief Project Proposal / Cost Estimate',
      'Bank Account Passbook / Cancelled Cheque'
    ],
    applicationSteps: [
      'Select nearest eligible Channel Partner (SCA, RRB, or PSB) with Low NPA via Geo-Locator',
      'Submit simplified loan application with SC and Income certificate',
      'Channel partner scrutiny and loan appraisal (90% project assistance sanctioned)',
      'Moratorium period of 3 to 6 months begins',
      'Repay concessional loan at 6.5% p.a. over 36 to 60 months'
    ],
    whereToApply: 'State Channelizing Agency (e.g. THADCO / Mahapreit), Local RRB Branch or authorized NBFC-MFI',
    officialPortal: 'https://nsfdc.nic.in/',
    isSampleData: false
  },
  {
    id: 'nsfdc-term-loan',
    name: 'NSFDC Term Loan Scheme for SC Entrepreneurs',
    shortName: 'NSFDC Term Loan',
    department: 'Ministry of Social Justice and Empowerment / NSFDC',
    nodalAgency: 'State Channelizing Agencies (SCAs) & Public Sector Banks',
    sector: 'Manufacturing, Agro-Processing, Transport, Engineering & Services',
    sectorsList: ['Manufacturing', 'Food Processing & Agro', 'Textiles & Handloom', 'Services & Software', 'Retail & Trade'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)'],
    maxFunding: 'Up to ₹50.00 Lakh (90% Project Cost Assistance)',
    maxFundingNum: 5000000,
    minFundingNum: 140000,
    subsidyRate: 'Concessional Interest at 7% to 8% p.a. covering up to 90% of project cost',
    marginMoney: '10% Promoters Margin (can converge with state MSME subsidies)',
    status: 'Strong Match',
    description: 'Provides concessional term loans up to ₹50.00 Lakhs for setting up viable income-generating projects in manufacturing, agro-processing, service, or transport sectors for SC beneficiaries with family income up to ₹5.00 Lakhs.',
    potentialBenefit: 'Up to ₹45 Lakh concessional loan (90% of ₹50L project) at 7%-8% p.a. with 6 to 12 months moratorium period.',
    whyMatchedReasons: [
      'Dedicated concessional term loan for Scheduled Caste (SC) entrepreneurs.',
      'Annual family income ceiling up to ₹5.00 Lakhs.',
      'Funding threshold covers capital expenditure up to ₹50.00 Lakh.',
      'Concessional interest rate between 7.0% and 8.0% per annum.',
      'Moratorium period of 6 to 12 months for machinery installation and setup.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 90,
      incomeMatch: 96,
      fundingMatch: 95,
      stageMatch: 95,
      categoryMatch: 100
    },
    eligibilityRules: [
      { criterion: 'Community Category', value: 'Scheduled Caste (SC) Entrepreneur', status: 'pass', note: 'Qualifies under target community' },
      { criterion: 'Annual Income Limit', value: 'Family income up to ₹5.00 Lakhs p.a.', status: 'pass', note: 'Eligible under NSFDC income norm' },
      { criterion: 'Project Outlay', value: 'Up to ₹50.00 Lakhs', status: 'pass', note: 'Project proposal within limits' },
      { criterion: 'Viable DPR', value: 'Detailed Project Report with cashflow', status: 'verify', note: 'Subject to SCA / Bank technical appraisal' }
    ],
    requiredDocuments: [
      'Caste / Community Certificate issued by Revenue Authority',
      'Family Income Certificate (Up to ₹5 Lakhs)',
      'Detailed Project Report (DPR) with Machinery Quotations',
      'Identity and Address Proof (Aadhaar, Voter ID, PAN)',
      'Bank Account Statement & Land/Lease Agreement'
    ],
    applicationSteps: [
      'Locate nearest eligible Channel Partner (SCA / Lead Public Sector Bank)',
      'Submit project proposal and DPR via Channel Partner desk',
      'Technical & financial appraisal by State Channelizing Agency / Bank',
      'Sanction of loan with 10% promoter contribution and 6-12 months moratorium',
      'Fund disbursement and commencement of commercial operations'
    ],
    whereToApply: 'State Channelizing Agency (SCA) district office or Lead Nationalized Bank branch',
    officialPortal: 'https://nsfdc.nic.in/',
    isSampleData: false
  },
  {
    id: 'nsfdc-educational-loan',
    name: 'NSFDC Educational Loan Scheme (NNKY - Navodaya)',
    shortName: 'NSFDC Education Loan',
    department: 'Ministry of Social Justice and Empowerment / NSFDC',
    nodalAgency: 'State Channelizing Agencies (SCAs) & Commercial Banks',
    sector: 'Higher Education, Technical & Professional Degrees, Skill Training',
    sectorsList: ['Services & Software', 'Manufacturing', 'Information Technology & Agritech'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)'],
    maxFunding: 'Up to ₹20 Lakh (India) / ₹30 Lakh (Abroad)',
    maxFundingNum: 3000000,
    minFundingNum: 100000,
    subsidyRate: 'Concessional Interest: 4.0% for Women, 4.5% for Men (Course duration + 6 months Moratorium)',
    marginMoney: 'Up to 90% of education & living expenditure covered',
    status: 'High Match',
    description: 'Provides concessional educational loans to meritorious SC students pursuing approved full-time professional or technical courses in India or abroad, with family income up to ₹5.00 Lakhs.',
    potentialBenefit: 'Highly subsidised interest rate of 4% (women) / 4.5% (men) with full moratorium covering the entire course duration plus 6 months.',
    whyMatchedReasons: [
      'Targeted concessional education funding for Scheduled Caste (SC) students.',
      'Covers tuition fees, books, equipment, and hostel expenses up to 90%.',
      'Ultra-concessional interest rate: 4% for female students and 4.5% for male students.',
      'Full moratorium during course study plus 6-month grace period after course completion.',
      'Repayment tenure up to 10 years following moratorium.'
    ],
    factorScores: {
      sectorMatch: 90,
      locationMatch: 90,
      incomeMatch: 95,
      fundingMatch: 92,
      stageMatch: 90,
      categoryMatch: 100
    },
    eligibilityRules: [
      { criterion: 'Caste Eligibility', value: 'Scheduled Caste (SC) Student', status: 'pass', note: 'Community verification satisfied' },
      { criterion: 'Income Ceiling', value: 'Family annual income up to ₹5.00 Lakhs', status: 'pass', note: 'Income threshold satisfied' },
      { criterion: 'Course Admission', value: 'Secured admission in approved professional/technical course', status: 'pass', note: 'Eligible academic program' }
    ],
    requiredDocuments: [
      'SC Community Certificate',
      'Family Income Certificate (Below ₹5.00 Lakhs)',
      'Admission Offer Letter & Fee Schedule',
      '10th / 12th / Degree Marksheets',
      'Aadhaar Card of Student & Co-applicant'
    ],
    applicationSteps: [
      'Apply through State Channelizing Agency (SCA) or designated Commercial Bank',
      'Submit admission documents and college fee demand note',
      'SCA sanction and disbursement directly to college / institute',
      'Course study with zero principal repayment',
      'Repayment starts 6 months after graduation over 5-10 years'
    ],
    whereToApply: 'State Channelizing Agency (e.g. THADCO) or participating Public Sector Bank',
    officialPortal: 'https://nsfdc.nic.in/',
    isSampleData: false
  },
  {
    id: 'standup-india',
    name: 'Stand-Up India Scheme for Women & SC/ST',
    shortName: 'Stand-Up India',
    department: 'Department of Financial Services, Ministry of Finance',
    nodalAgency: 'SIDBI (Small Industries Development Bank of India)',
    sector: 'Manufacturing, Services, Agri-allied & Trading',
    sectorsList: ['Textiles & Handloom', 'Food Processing & Agro', 'Information Technology & Agritech', 'Manufacturing', 'Retail & Trade'],
    stageEligibility: ['New (Startup)'],
    maxFunding: '₹10 Lakh to ₹100 Lakh (₹1 Crore)',
    maxFundingNum: 10000000,
    minFundingNum: 1000000,
    subsidyRate: 'Concessional Composite Loan (Term Loan + Working Capital) with Credit Guarantee',
    marginMoney: 'Up to 15% (can be converged with eligible State/Central subsidies)',
    status: 'Strong Match',
    description: 'Facilitates bank loans between ₹10 lakh and ₹1 crore to at least one SC or ST borrower and at least one woman borrower per bank branch.',
    potentialBenefit: 'Low interest composite loan covering 85% of project cost, backed by National Credit Guarantee Trustee Company (NCGTC).',
    whyMatchedReasons: [
      'Social/Gender criteria: Specifically designed for Women and SC/ST entrepreneurs setting up greenfield units.',
      'Greenfield enterprise eligibility matches proposed new venture profile.',
      'Loan covers both machinery acquisition and working capital margin.',
      'Repayment tenure up to 7 years with an 18-month moratorium period.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 90,
      incomeMatch: 88,
      fundingMatch: 92,
      stageMatch: 90,
      categoryMatch: 100
    },
    eligibilityRules: [
      { criterion: 'Entrepreneur Category', value: 'SC / ST or Woman Entrepreneur', status: 'pass', note: 'Profile satisfies category criteria' },
      { criterion: 'Greenfield Enterprise', value: 'First-time venture in sector', status: 'pass', note: 'Qualifies as a new enterprise' },
      { criterion: 'Minimum Shareholding', value: '51% or higher controlling stake', status: 'pass', note: 'Sole proprietor / Majority partner satisfies rule' },
      { criterion: 'Credit History Check', value: 'Non-defaulter to any bank/financial institution', status: 'verify', note: 'Subject to CIBIL validation' }
    ],
    requiredDocuments: [
      'Proof of Identification (Aadhaar, PAN Card)',
      'Category Certificate (SC/ST/Woman proof)',
      'Proof of Business Address & Proposed Site Lease',
      'Detailed Project Profile & Machinery Quotations',
      'Bank Account Statement (Last 6 Months)',
      'ITR / Income Declaration'
    ],
    applicationSteps: [
      'Register on standupmitra.in portal as a Trainee or Ready Borrower',
      'Connect with designated Lead District Manager (LDM) or preferred bank branch',
      'Undergo handholding support via SIDBI ecosystem partners',
      'Bank appraisal of greenfield project & sanctioning of composite credit line',
      'Disbursement and linkage with Credit Guarantee cover'
    ],
    whereToApply: 'standupmitra.in or any Scheduled Commercial Bank branch',
    officialPortal: 'https://www.standupmitra.in/',
    isSampleData: true
  },
  {
    id: 'nssh-sc-st-hub',
    name: 'National SC-ST Hub (NSSH) Special Capital Subsidy',
    shortName: 'National SC-ST Hub',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    nodalAgency: 'National Small Industries Corporation (NSIC)',
    sector: 'Manufacturing, Agro-processing, Handloom & Service Enterprises',
    sectorsList: ['Textiles & Handloom', 'Manufacturing', 'Food Processing & Agro', 'Food Products & Spices', 'Services & Software'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)'],
    maxFunding: '25% Capital Subsidy up to ₹25 Lakh on Plant & Machinery',
    maxFundingNum: 2500000,
    minFundingNum: 200000,
    subsidyRate: '25% Upfront Capital Subsidy + 100% Reimbursement on BIS/ISO certification & GeM registration fees',
    marginMoney: '10% standard contribution',
    status: 'Strong Match',
    description: 'Promotes entrepreneurship among SC and ST communities by providing capital subsidies, vendor development with PSUs, and technology upgradation.',
    potentialBenefit: '25% upfront subsidy on modern machinery procurement, priority procurement quota in Central Public Sector Enterprises (CPSEs), and free training.',
    whyMatchedReasons: [
      'Tailored exclusively for SC/ST enterprise owners holding minimum 51% equity.',
      '25% non-repayable capital subsidy on modern machinery and equipment.',
      'Mandatory 4% procurement quota in all Central Government tenders reserved for SC/ST MSMEs.',
      '100% reimbursement of testing, quality certification and trade fair participation costs.'
    ],
    factorScores: {
      sectorMatch: 92,
      locationMatch: 90,
      incomeMatch: 90,
      fundingMatch: 90,
      stageMatch: 92,
      categoryMatch: 100
    },
    eligibilityRules: [
      { criterion: 'Community Ownership', value: 'SC/ST promoter with 51%+ controlling share', status: 'pass', note: 'Category certificate verified' },
      { criterion: 'Enterprise Category', value: 'Micro & Small Enterprises with Udyam registration', status: 'pass', note: 'MSME classification valid' },
      { criterion: 'Machinery Nature', value: 'Well-defined modern, energy-efficient technology', status: 'pass', note: 'Eligible plant & machinery list' }
    ],
    requiredDocuments: [
      'SC/ST Certificate issued by competent revenue authority',
      'Udyam Registration Certificate',
      'Proforma invoice and catalog of proposed machinery',
      'Bank Loan Sanction Letter',
      'Audited accounts or balance sheet projection',
      'Aadhaar and PAN of the promoters'
    ],
    applicationSteps: [
      'Apply online on the NSSH portal or visit nearest NSIC Branch Office',
      'Lending bank sanctions term loan for plant and machinery',
      'Bank uploads subsidy claim to the online NSSH / MSME portal',
      'NSIC verifies category documents and technical specs of machinery',
      'Subsidy released directly to the lending bank to reduce loan liability'
    ],
    whereToApply: 'scsthub.in or nearest National Small Industries Corporation (NSIC) office',
    officialPortal: 'https://www.scsthub.in/',
    isSampleData: true
  },
  {
    id: 'pm-svanidhi',
    name: 'PM Street Vendor’s AtmaNirbhar Nidhi (PM SVANidhi)',
    shortName: 'PM SVANidhi',
    department: 'Ministry of Housing and Urban Affairs (MoHUA)',
    nodalAgency: 'Small Industries Development Bank of India (SIDBI)',
    sector: 'Street Vending, Hawkers, Micro Retail, Food Carts & Daily Services',
    sectorsList: ['Food Processing & Agro', 'Retail & Trade', 'Services & Software', 'Textiles & Handloom', 'Manufacturing'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)'],
    maxFunding: '₹10,000 (1st Tranche) | ₹20,000 (2nd Tranche) | ₹50,000 (3rd Tranche)',
    maxFundingNum: 50000,
    minFundingNum: 10000,
    subsidyRate: '7% Interest Subsidy on timely repayment + Digital Cashback up to ₹1,200/year',
    marginMoney: '0% (Completely collateral-free micro-credit)',
    status: 'Strong Match',
    description: 'Provides working capital micro-loans (₹10,000 to ₹50,000 across 3 tranches) with a 7% interest subsidy and digital transaction incentives to street vendors.',
    potentialBenefit: 'Affordable working capital with no collateral, fast digital approval, 7% interest subvention credited directly to bank account, and graduated higher loan limits.',
    whyMatchedReasons: [
      'Zero collateral requirement and no guarantor needed for micro-vending activities.',
      '7% annual interest subsidy directly credited to beneficiary bank account upon timely repayment.',
      'Instant digital credit escalation from ₹10k to ₹20k and up to ₹50k.',
      'Cashback rewards up to ₹100 per month on performing digital UPI transactions.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 92,
      incomeMatch: 95,
      fundingMatch: 95,
      stageMatch: 90,
      categoryMatch: 90
    },
    eligibilityRules: [
      { criterion: 'Vendor Verification', value: 'Vending Certificate / Identity Card or LoR from Urban Local Body (ULB)', status: 'pass', note: 'Street vendor ID verified' },
      { criterion: 'Age Requirement', value: '18+ years of age', status: 'pass', note: 'Age eligibility met' },
      { criterion: 'Bank Account Linkage', value: 'Active bank account linked with Aadhaar mobile', status: 'pass', note: 'Aadhaar e-KYC enabled' }
    ],
    requiredDocuments: [
      'Aadhaar Card (linked to active mobile number)',
      'Voter ID / Driving Licence',
      'Certificate of Vending / ID card or Letter of Recommendation (LoR) from ULB',
      'Bank Account Passbook / Statement',
      'Passport-size Photograph'
    ],
    applicationSteps: [
      'Access the PM SVANidhi official portal or mobile app',
      'Verify mobile number via Aadhaar OTP',
      'Select Urban Local Body (ULB) / Municipality and upload Vending Certificate or LoR',
      'Choose preferred Lending Institution / Bank / Microfinance (MFI)',
      'Submit application for instant digital sanction and direct DBT loan credit'
    ],
    whereToApply: 'Online at pmsvanidhi.mohua.gov.in or via Common Service Centres (CSCs)',
    officialPortal: 'https://pmsvanidhi.mohua.gov.in/',
    isSampleData: true
  },
  {
    id: 'agri-infra-fund',
    name: 'Agriculture Infrastructure Fund (AIF)',
    shortName: 'AIF Scheme',
    department: 'Department of Agriculture and Farmers Welfare, Ministry of Agriculture',
    nodalAgency: 'National Bank for Agriculture and Rural Development (NABARD)',
    sector: 'Agriculture, Post-harvest Management, Cold Chain & Agro-processing',
    sectorsList: ['Food Processing & Agro', 'Manufacturing', 'Services & Software', 'Retail & Trade'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)'],
    maxFunding: 'Up to ₹2 Crore (Debt Financing with Interest Subvention)',
    maxFundingNum: 20000000,
    minFundingNum: 500000,
    subsidyRate: '3% Interest Subvention per annum for loans up to ₹2 Crore (up to 7 years) + CGTMSE Fee Coverage',
    marginMoney: '10% - 20% promoter contribution',
    status: 'High Match',
    description: 'A medium-to-long term debt financing facility offering a 3% interest subvention and credit guarantee on loans up to ₹2 crore for post-harvest management and community farming assets.',
    potentialBenefit: '3% per annum interest subvention up to ₹2 Crore for 7 years and credit guarantee coverage under CGTMSE with fee paid by government.',
    whyMatchedReasons: [
      'Eligible for post-harvest units, organic input production, cold storage, and primary processing.',
      '3% interest relief lowers net borrowing cost substantially to below 6-7% p.a.',
      'Government pays the annual CGTMSE credit guarantee fee on behalf of the borrower.',
      'Can be converged with other central capital subsidies like PMFME and PMEGP.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 95,
      incomeMatch: 88,
      fundingMatch: 90,
      stageMatch: 92,
      categoryMatch: 88
    },
    eligibilityRules: [
      { criterion: 'Applicant Type', value: 'Farmer, Agri-entrepreneur, FPO, SHG, Cooperative or Agritech Startup', status: 'pass', note: 'Eligible entity' },
      { criterion: 'Project Category', value: 'Post-harvest management / Community farming infrastructure', status: 'pass', note: 'Eligible asset class' },
      { criterion: 'Loan Ceiling', value: 'Loans up to ₹2 Crore qualify for 3% interest subvention', status: 'pass', note: 'Within debt ceiling' }
    ],
    requiredDocuments: [
      'Detailed Project Report (DPR)',
      'Land ownership or minimum 10-year lease documents',
      'KYC of promoter(s) (Aadhaar & PAN)',
      'Bank statements (past 12 months)',
      '3-year Audited Balance Sheets / ITRs (if existing business)',
      'Local authority building / layout approvals'
    ],
    applicationSteps: [
      'Register on the Agri Infra Fund portal (agriinfra.dac.gov.in)',
      'Fill online application and upload Detailed Project Report (DPR)',
      'Ministry of Agriculture Project Management Unit (PMU) reviews eligibility',
      'Application routed to chosen scheduled bank for credit appraisal',
      'Bank sanctions loan with automatic 3% interest subvention and CGTMSE cover'
    ],
    whereToApply: 'Online at agriinfra.dac.gov.in or any Nationalized / Commercial Bank',
    officialPortal: 'https://agriinfra.dac.gov.in/',
    isSampleData: true
  },
  {
    id: 'cgss-startup-guarantee',
    name: 'Credit Guarantee Scheme for Startups (CGSS)',
    shortName: 'CGSS Startups',
    department: 'Department for Promotion of Industry and Internal Trade (DPIIT), Ministry of Commerce',
    nodalAgency: 'National Credit Guarantee Trustee Company (NCGTC)',
    sector: 'DPIIT-Recognized Startups, Technology, Agritech & Innovative Manufacturing',
    sectorsList: ['Information Technology & Agritech', 'Services & Software', 'Manufacturing', 'Food Processing & Agro'],
    stageEligibility: ['New (Startup)'],
    maxFunding: 'Up to ₹10 Crore (Collateral-Free Credit Guarantee)',
    maxFundingNum: 100000000,
    minFundingNum: 500000,
    subsidyRate: 'Credit guarantee coverage up to ₹10 Crore without requiring third-party collateral or personal asset mortgage',
    marginMoney: '10% - 15% promoter / venture equity',
    status: 'Strong Match',
    description: 'Provides credit guarantee coverage up to ₹10 crore to Member Lending Institutions (banks/NBFCs/AIFs) against collateral-free loans extended to viable startups.',
    potentialBenefit: 'Enables high-growth startups to secure up to ₹10 Crore bank debt without surrendering secondary property collateral.',
    whyMatchedReasons: [
      'Specifically targeted at DPIIT-recognized early-stage startups and innovation ventures.',
      'Guarantee coverage covers up to 85% of defaulted amount for credit facilities up to ₹3 Cr.',
      'Working capital and term loans both covered under a single unified guarantee line.',
      'Supports debt-funded scale-up without dilution of founder equity.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 90,
      incomeMatch: 85,
      fundingMatch: 95,
      stageMatch: 95,
      categoryMatch: 85
    },
    eligibilityRules: [
      { criterion: 'DPIIT Recognition', value: 'Active Certificate of Recognition from DPIIT', status: 'pass', note: 'Startup recognition valid' },
      { criterion: 'Revenue Track Record', value: '12 months audited revenue statements or VC/AIF funding commitment', status: 'pass', note: 'Business viability proven' },
      { criterion: 'Credit Standing', value: 'Non-NPA, no loan defaults in past financial records', status: 'pass', note: 'Clean credit history' }
    ],
    requiredDocuments: [
      'DPIIT Recognition Certificate',
      'Certificate of Incorporation / Partnership Deed',
      'Audited monthly financial statements for past 12 months',
      'Detailed Business Plan with revenue model',
      'GST and PAN registrations',
      'Promoter KYC'
    ],
    applicationSteps: [
      'Obtain DPIIT Recognition through Startup India portal',
      'Approach Member Lending Institution (PSBs, Private Banks, or NCGTC-registered NBFCs)',
      'Bank conducts technical evaluation and credit underwriting',
      'Bank requests NCGTC guarantee cover under CGSS portal',
      'Loan disbursed with sovereign credit guarantee coverage'
    ],
    whereToApply: 'ncgtc.co.in or startupindia.gov.in via Member Lending Institutions',
    officialPortal: 'https://ncgtc.co.in/',
    isSampleData: true
  },
  {
    id: 'sfurti-scheme',
    name: 'Scheme of Fund for Regeneration of Traditional Industries (SFURTI)',
    shortName: 'SFURTI Scheme',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    nodalAgency: 'KVIC / Coir Board / IIE / NIMSME',
    sector: 'Traditional Industries, Artisans, Handloom, Pottery, Agro-processing Clusters',
    sectorsList: ['Textiles & Handloom', 'Food Processing & Agro', 'Manufacturing', 'Retail & Trade'],
    stageEligibility: ['Existing (Expansion)', 'New (Startup)'],
    maxFunding: 'Up to ₹5 Crore (100% Financial Grant for Cluster Infrastructure)',
    maxFundingNum: 50000000,
    minFundingNum: 1000000,
    subsidyRate: 'Up to ₹5 Crore (Regular clusters: ₹2.5 Cr / Major clusters: ₹5 Cr) financial grant for Common Facility Centres (CFCs)',
    marginMoney: 'Nil for artisans; Implementing Agency provides land/space',
    status: 'High Match',
    description: 'Provides financial assistance up to ₹5 crore to set up Common Facility Centres (CFCs), modern infrastructure, and market-linkage support for traditional artisan clusters.',
    potentialBenefit: '100% government funding for machinery, tooling, packaging lines, and design training in rural and artisan clusters.',
    whyMatchedReasons: [
      'Provides modern Common Facility Centres (CFC) to elevate traditional craftspersons.',
      'Non-repayable 100% grant covering plant, machinery, testing labs, and packaging units.',
      'Supports branding, e-commerce onboarding, and export linkages for cluster products.',
      'Directly uplifts rural women, weavers, potters, and agro-processors.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 95,
      incomeMatch: 90,
      fundingMatch: 92,
      stageMatch: 90,
      categoryMatch: 92
    },
    eligibilityRules: [
      { criterion: 'Cluster Size', value: 'Cluster comprising 100 to 500 traditional artisans/craftspersons', status: 'pass', note: 'Cluster criteria met' },
      { criterion: 'Applicant Entity', value: 'NGO / Cooperative Society / PRIs / State Govt Agency with NGO Darpan ID', status: 'pass', note: 'Eligible Implementing Agency' },
      { criterion: 'Infrastructure Space', value: 'Land / building ownership or long-term lease for CFC', status: 'pass', note: 'Land availability confirmed' }
    ],
    requiredDocuments: [
      'Implementing Agency registration certificate & NGO Darpan ID',
      '3-year audited financial records of the applicant agency',
      'Land ownership / lease deed for the CFC facility',
      'Detailed Project Report (DPR) / Diagnostic Study Report (DSR)',
      'Full roster of cluster artisans with Aadhaar and category details'
    ],
    applicationSteps: [
      'Submit Concept Proposal on SFURTI portal (sfurti.msme.gov.in)',
      'Nodal Agency evaluates and approves Diagnostic Study Report (DSR)',
      'Technical Agency prepares Detailed Project Report (DPR)',
      'Scheme Steering Committee (SSC) approves final financial grant',
      'Grant disbursed in tranches for CFC construction and machinery procurement'
    ],
    whereToApply: 'Online at sfurti.msme.gov.in or nearest KVIC / Coir Board State Office',
    officialPortal: 'https://sfurti.msme.gov.in/',
    isSampleData: true
  },
  {
    id: 'aspire-scheme',
    name: 'A Scheme for Promotion of Innovation, Rural Industries & Entrepreneurship (ASPIRE)',
    shortName: 'ASPIRE Scheme',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    nodalAgency: 'SIDBI / NSIC / Coir Board / KVIC',
    sector: 'Agro-rural Industry, Rural Entrepreneurship & Technology Incubation',
    sectorsList: ['Food Processing & Agro', 'Manufacturing', 'Information Technology & Agritech', 'Services & Software'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)'],
    maxFunding: 'Up to ₹1 Crore for LBI setup / ₹1.5 Crore for TBI setup',
    maxFundingNum: 15000000,
    minFundingNum: 500000,
    subsidyRate: '100% one-time grant of up to ₹1 Crore for plant and machinery procurement for Livelihood Business Incubators (LBIs)',
    marginMoney: 'Host institution provides space and utilities',
    status: 'High Match',
    description: 'Facilitates market-driven enterprise creation and employment generation by establishing Livelihood Business Incubators (LBIs) and Technology Business Incubators (TBIs) in agro-rural industries.',
    potentialBenefit: 'Free hands-on incubation training, access to high-tech agro-processing machinery, seed funding, and market mentorship for rural youth.',
    whyMatchedReasons: [
      'Enables rural entrepreneurs and youth to incubate micro-enterprises with zero upfront machinery cost.',
      '100% financial grant for setting up specialized incubation centres in agro-rural clusters.',
      'Provides structured skill development, commercialization support, and seed capital.',
      'Strong focus on automation, rural manufacturing, and food value addition.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 92,
      incomeMatch: 88,
      fundingMatch: 90,
      stageMatch: 92,
      categoryMatch: 88
    },
    eligibilityRules: [
      { criterion: 'Incubator Host Entity', value: 'Technical universities, colleges, ICAR/CSIR bodies, or Govt departments', status: 'pass', note: 'Host eligibility verified' },
      { criterion: 'Entrepreneur/Trainee Age', value: '18+ years with viable agro-rural business idea', status: 'pass', note: 'Age criterion satisfied' },
      { criterion: 'Sector Focus', value: 'Agro-processing, rural manufacturing, handloom, farm machinery', status: 'pass', note: 'Sector aligned' }
    ],
    requiredDocuments: [
      'Host Institution registration / charter certificate',
      'DPR detailing proposed incubation infrastructure and budget outlay',
      'Land / space allotment proof',
      'Institutional audited accounts for the past 3 years'
    ],
    applicationSteps: [
      'Apply online on the ASPIRE portal (aspire.msme.gov.in)',
      'Submit Project Proposal with machinery list and training curriculum',
      'Project Screening Committee (PSC) evaluates and shortlists application',
      'Sanction letter issued and grant released directly to incubator bank account',
      'Incubator admits rural entrepreneurs for technical training and venture incubation'
    ],
    whereToApply: 'Online at aspire.msme.gov.in or nearest NSIC / MSME-DFO centre',
    officialPortal: 'https://aspire.msme.gov.in/',
    isSampleData: true
  },
  {
    id: 'msme-champions',
    name: 'MSME Champions Scheme (Innovative / ZED / Lean)',
    shortName: 'MSME Champions',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    nodalAgency: 'Development Commissioner (MSME)',
    sector: 'Micro, Small and Medium Enterprises in Manufacturing & Services',
    sectorsList: ['Manufacturing', 'Food Processing & Agro', 'Textiles & Handloom', 'Services & Software'],
    stageEligibility: ['Existing (Expansion)', 'New (Startup)'],
    maxFunding: 'Up to ₹15 Lakh for Design / Up to ₹1 Crore for Incubation / Up to 80% Subsidy on ZED',
    maxFundingNum: 10000000,
    minFundingNum: 100000,
    subsidyRate: 'Up to 80% subsidy for Micro (60% Small, 50% Medium) on ZED green certification + Up to ₹15 Lakh design grant',
    marginMoney: '20% own contribution for Micro enterprises on certification fees',
    status: 'Strong Match',
    description: 'Delivers technical and financial assistance for intellectual property rights (IPR), design implementation, lean manufacturing interventions, and Zero Defect Zero Effect (ZED) green certifications.',
    potentialBenefit: '80% subsidy on ZED green certification fees, up to ₹15 Lakh reimbursement for product design, and 100% IPR patent filing fee support.',
    whyMatchedReasons: [
      'High subsidy rate (80%) for Micro enterprises obtaining ZED Bronze, Silver, or Gold certificates.',
      'Subsidized consultancy for implementing 5S, Kaizen, and Lean manufacturing methods.',
      'Financial support up to ₹1 Crore for nurturing innovative MSME startup prototypes.',
      'Banks provide concessions in loan processing fees and interest rates for ZED-certified MSMEs.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 90,
      incomeMatch: 90,
      fundingMatch: 90,
      stageMatch: 95,
      categoryMatch: 90
    },
    eligibilityRules: [
      { criterion: 'Udyam Registration', value: 'Active Udyam Registration Certificate', status: 'pass', note: 'Udyam status verified' },
      { criterion: 'Manufacturing / Service Unit', value: 'Operating MSME with active production/service facility', status: 'pass', note: 'Operating status confirmed' },
      { criterion: 'Statutory Compliances', value: 'Compliant with pollution control and labor laws', status: 'pass', note: 'Compliance check passed' }
    ],
    requiredDocuments: [
      'Udyam Registration Certificate',
      'PAN and GSTIN',
      'Audited balance sheets and ITRs for the past 2–3 years',
      'Bank account statement / cancelled cheque',
      'Scheme-specific documents (e.g. patent/design application draft or ZED self-assessment submission)'
    ],
    applicationSteps: [
      'Register on champions.gov.in or zed.msme.gov.in with Udyam number',
      'Select desired component (ZED Certification / Design / Incubation / Lean)',
      'Complete online self-assessment and upload required documents',
      'Accredited assessment agency conducts desk assessment or on-site audit',
      'Grant / subsidy reimbursed directly to MSME bank account'
    ],
    whereToApply: 'Online at champions.gov.in or zed.msme.gov.in',
    officialPortal: 'https://champions.gov.in/',
    isSampleData: true
  },
  {
    id: 'sri-fund',
    name: 'Self Reliant India (SRI) Fund',
    shortName: 'SRI Fund',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    nodalAgency: 'National Small Industries Corporation (NSIC) / NSIC Venture Capital Fund Limited (NVCFL)',
    sector: 'High-growth MSMEs, Manufacturing, Export, Green Tech & Agritech',
    sectorsList: ['Manufacturing', 'Food Processing & Agro', 'Textiles & Handloom', 'Information Technology & Agritech'],
    stageEligibility: ['Existing (Expansion)'],
    maxFunding: '₹50,000 Crore Fund-of-Funds Structure (Equity Infusion up to ₹10 Crore per MSME)',
    maxFundingNum: 100000000,
    minFundingNum: 5000000,
    subsidyRate: 'Direct equity and quasi-equity growth capital to fuel expansion and assist viable MSMEs to list on SME / Stock Exchanges',
    marginMoney: 'Equity investment structure (Patient growth capital)',
    status: 'Moderate Match',
    description: 'A ₹50,000 crore Fund-of-Funds structure providing growth capital and equity infusion into viable, expanding MSMEs to help them list on public exchanges.',
    potentialBenefit: 'Substantial patient equity capital up to ₹10 Crore without collateral, professional board governance, and assistance for IPO listing on BSE SME/NSE Emerge.',
    whyMatchedReasons: [
      'Provides risk capital and equity investment for high-growth potential MSMEs.',
      'Operates through Daughter Funds managed by top institutional venture capital funds.',
      'Assists MSMEs in scaling into large global enterprises and getting listed on stock exchanges.',
      'Supports capital expenditure, modern technology adoption, and overseas market entry.'
    ],
    factorScores: {
      sectorMatch: 90,
      locationMatch: 85,
      incomeMatch: 85,
      fundingMatch: 90,
      stageMatch: 95,
      categoryMatch: 85
    },
    eligibilityRules: [
      { criterion: 'Enterprise Stage', value: 'Growth-stage MSME with positive operational track record', status: 'pass', note: 'Operational track record verified' },
      { criterion: 'Udyam Registration', value: 'Valid Udyam Registration as Micro, Small, or Medium unit', status: 'pass', note: 'MSME registration active' },
      { criterion: 'Expansion Roadmap', value: 'Documented business plan showing scalability and path to IPO listing', status: 'pass', note: 'Growth model viable' }
    ],
    requiredDocuments: [
      'Udyam Registration Certificate',
      'Comprehensive Business Pitch Deck & Valuation Model',
      '3-year Audited Annual Financial Statements & Balance Sheets',
      'Corporate Tax Returns (ITR-6)',
      'Promoter / Director Shareholding Ledger and KYC Documents'
    ],
    applicationSteps: [
      'Register on srifund.nsic.co.in portal',
      'Submit company profile, pitch deck, and historical financial performance',
      'NVCFL Daughter Funds evaluate investment proposals and financial models',
      'Due diligence, valuation negotiation, and term sheet execution',
      'Equity funds disbursed into company account for accelerated business expansion'
    ],
    whereToApply: 'Online at srifund.nsic.co.in or through accredited Daughter Funds (SEBI Registered AIFs)',
    officialPortal: 'https://srifund.nsic.co.in/',
    isSampleData: true
  },
  {
    id: 'pmfme-scheme',
    name: 'PM Formalisation of Micro Food Processing Enterprises (PMFME)',
    shortName: 'PMFME Scheme',
    department: 'Ministry of Food Processing Industries (MoFPI)',
    nodalAgency: 'State Nodal Agencies (SNA) / National Institute of Food Technology (NIFTEM)',
    sector: 'Food Processing, Spices, Dairy, Bakery & Agro Products',
    sectorsList: ['Food Processing & Agro', 'Food Products & Spices', 'Manufacturing'],
    stageEligibility: ['Existing (Expansion)', 'New (Startup)'],
    maxFunding: '35% Capital Subsidy (Up to ₹10 Lakh per unit) + ₹40,000 Seed Capital',
    maxFundingNum: 1000000,
    minFundingNum: 50000,
    subsidyRate: '35% Credit-Linked Capital Subsidy (Max ₹10 Lakh) + 50% Subsidy for Branding & Marketing',
    marginMoney: '10% beneficiary contribution for individual micro-units',
    status: 'Strong Match',
    description: 'Provides financial, technical and business support for the upgradation of micro food processing enterprises under One District One Product (ODOP).',
    potentialBenefit: '35% credit-linked capital subsidy up to ₹10 Lakh, ₹40,000 seed capital for SHG members, and 50% branding support.',
    whyMatchedReasons: [
      'Direct sector alignment with Food Processing, Spices & Agro-allied products.',
      'Credit-linked capital subsidy covers 35% of eligible project cost up to ₹10 Lakh.',
      'Special preference given to One District One Product (ODOP) recognized produce.',
      'Free technical handholding and DPR preparation support by District Resource Persons (DRP).'
    ],
    factorScores: {
      sectorMatch: 100,
      locationMatch: 95,
      incomeMatch: 92,
      fundingMatch: 92,
      stageMatch: 92,
      categoryMatch: 90
    },
    eligibilityRules: [
      { criterion: 'Sector Alignment', value: 'Micro Food Processing / Agro Unit', status: 'pass', note: 'Food processing enterprise confirmed' },
      { criterion: 'Ownership & Legal Status', value: 'Individual / Partnership / FPO / SHG', status: 'pass', note: 'Ownership criteria met' },
      { criterion: 'Age & Nationality', value: 'Indian Citizen, 18+ years of age', status: 'pass', note: 'Age eligibility satisfied' }
    ],
    requiredDocuments: [
      'Identity & Address Proof (Aadhaar & PAN)',
      'Food Safety (FSSAI) Registration / Declaration',
      'Quotation for Food Processing Machinery',
      'Detailed Project Report (DPR)',
      'Bank Statement (Last 6 Months)',
      'Udyam Registration Certificate'
    ],
    applicationSteps: [
      'Submit application on pmfme.mofpi.gov.in portal',
      'District Resource Person (DRP) assists in preparing bankable DPR',
      'District Level Committee (DLC) scrutinizes and recommends application to Bank',
      'Financing bank sanctions loan and releases term loan',
      'MoFPI deposits 35% capital subsidy into borrower bank TDR account'
    ],
    whereToApply: 'Online at pmfme.mofpi.gov.in or District Industries Centre (DIC)',
    officialPortal: 'https://pmfme.mofpi.gov.in/',
    isSampleData: true
  },
  {
    id: 'mudra-pmmy',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY - Shishu / Kishore / Tarun)',
    shortName: 'MUDRA Yojana',
    department: 'Department of Financial Services, Ministry of Finance',
    nodalAgency: 'MUDRA / Micro Units Development & Refinance Agency',
    sector: 'Non-Corporate, Non-Farm Small/Micro Enterprises',
    sectorsList: ['Food Processing & Agro', 'Textiles & Handloom', 'Food Products & Spices', 'Services & Software', 'Manufacturing', 'Retail & Trade'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)'],
    maxFunding: '₹50,000 (Shishu) | ₹5 Lakh (Kishore) | ₹10–20 Lakh (Tarun)',
    maxFundingNum: 2000000,
    minFundingNum: 50000,
    subsidyRate: 'Collateral-free credit with subsidized processing fee and Mudra Card facility',
    marginMoney: 'Nil for Shishu; 10% - 15% for Kishore & Tarun',
    status: 'Strong Match',
    description: 'Provides accessible collateral-free loans up to ₹20 lakh to non-farm, non-corporate micro enterprises and artisans.',
    potentialBenefit: 'Zero collateral requirement, affordable interest rates, quick sanction through PSB & Gramin Banks, and MUDRA debit card for working capital.',
    whyMatchedReasons: [
      'Exact loan bracket fit: Target amount fits directly into the Kishore (₹50k - ₹5L) / Tarun tier.',
      'No collateral or third-party guarantor required by statutory mandate.',
      'Applicable for both manufacturing, processing and service sector enterprises.',
      'Fast-track paperless processing at public sector, RRB and cooperative banks.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 95,
      incomeMatch: 95,
      fundingMatch: 92,
      stageMatch: 95,
      categoryMatch: 85
    },
    eligibilityRules: [
      { criterion: 'Enterprise Classification', value: 'Micro / Small non-farm enterprise', status: 'pass', note: 'Eligible non-corporate business' },
      { criterion: 'Collateral Requirement', value: 'Nil (Statutory Collateral-Free)', status: 'pass', note: '100% collateral-free eligible' },
      { criterion: 'Purpose of Loan', value: 'Machinery, Equipment, Working Capital', status: 'pass', note: 'Business expense purpose valid' }
    ],
    requiredDocuments: [
      'Proof of Identity (Aadhaar / Voter ID / PAN)',
      'Proof of Residence & Business Address',
      'Quotation for Machinery / Raw Materials',
      'Bank Account Statement (Last 6 Months)',
      'Business Registration / Udyam Certificate (if available)'
    ],
    applicationSteps: [
      'Apply online via udyamimitra.in portal or visit nearest bank branch',
      'Select loan category (Shishu, Kishore, or Tarun)',
      'Submit business plan along with quotations for machinery/inventory',
      'Bank verifies KYC and performs credit bureau (CIBIL) check',
      'Loan sanctioned and MUDRA Card issued for working capital withdrawals'
    ],
    whereToApply: 'udyamimitra.in or any Nationalized Bank, Regional Rural Bank (RRB), or NBFC',
    officialPortal: 'https://www.mudra.org.in/',
    isSampleData: true
  },
  {
    id: 'cgtmse',
    name: 'Credit Guarantee Scheme for Micro & Small Enterprises (CGTMSE)',
    shortName: 'CGTMSE',
    department: 'Ministry of MSME & SIDBI',
    nodalAgency: 'Credit Guarantee Fund Trust for Micro and Small Enterprises',
    sector: 'Manufacturing & Service Enterprises across all sectors',
    sectorsList: ['Manufacturing', 'Food Processing & Agro', 'Textiles & Handloom', 'Services & Software', 'Retail & Trade'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)'],
    maxFunding: 'Up to ₹500 Lakh (₹5 Crore) Collateral-Free Credit',
    maxFundingNum: 50000000,
    minFundingNum: 500000,
    subsidyRate: 'Guarantee coverage up to 85% for SC/ST, Women, and ZED-certified MSMEs (75% for General)',
    marginMoney: '10% - 15% standard margin contribution',
    status: 'High Match',
    description: 'Facilitates access to collateral-free debt financing for micro and small enterprises by providing credit guarantees to lending institutions.',
    potentialBenefit: 'Secures bank credit up to ₹5 Crore without providing land or building mortgages, with 85% credit guarantee for marginalized entrepreneurs.',
    whyMatchedReasons: [
      'Eliminates the requirement for secondary collateral security or third-party guarantors.',
      'Preferential 85% guarantee coverage and 10% concession in annual guarantee fees for Women, SC/ST, and Rural entrepreneurs.',
      'Available across all Scheduled Commercial Banks, RRBs, and leading NBFCs.',
      'Enables business expansion and machinery procurement at competitive interest rates.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 90,
      incomeMatch: 90,
      fundingMatch: 95,
      stageMatch: 95,
      categoryMatch: 90
    },
    eligibilityRules: [
      { criterion: 'Enterprise Classification', value: 'Micro or Small Enterprise as per MSMED Act', status: 'pass', note: 'MSME category verified' },
      { criterion: 'Borrower Category', value: 'New or existing MSE with viable business proposal', status: 'pass', note: 'Eligible borrower type' },
      { criterion: 'Loan Ceiling', value: 'Credit facilities up to ₹5 Crore', status: 'pass', note: 'Within guarantee ceiling' }
    ],
    requiredDocuments: [
      'Udyam Registration Certificate',
      'Detailed Project Report (DPR) and Financial Projections',
      'KYC documents of Directors / Partners / Proprietor',
      'Past 2 years Audited Balance Sheets (for existing units)',
      'Proforma Invoices for Plant & Machinery'
    ],
    applicationSteps: [
      'Approach a Member Lending Institution (MLI) with project proposal',
      'Bank evaluates business viability and sanctions credit facility',
      'Bank applies online to CGTMSE trust for credit guarantee coverage',
      'Guarantee fee paid and coverage certificate issued by CGTMSE',
      'Loan disbursed to borrower account without demanding collateral'
    ],
    whereToApply: 'cgtmse.in or through any Scheduled Commercial Bank / Financial Institution',
    officialPortal: 'https://www.cgtmse.in/',
    isSampleData: true
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Scheme',
    shortName: 'PM Vishwakarma',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    nodalAgency: 'Ministry of MSME & Ministry of Skill Development',
    sector: 'Traditional Artisans & Craftspersons across 18 Trades',
    sectorsList: ['Textiles & Handloom', 'Manufacturing', 'Food Processing & Agro', 'Retail & Trade'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)'],
    maxFunding: '₹1 Lakh (1st Tranche) + ₹2 Lakh (2nd Tranche) at 5% Concessional Interest',
    maxFundingNum: 300000,
    minFundingNum: 25000,
    subsidyRate: '₹15,000 Toolkit Incentive Grant + 5% Concessional Interest Loan with 8% Interest Subvention',
    marginMoney: '0% (No collateral or margin contribution)',
    status: 'High Match',
    description: 'Comprehensive support scheme for traditional artisans and craftspersons with PM Vishwakarma Certificate, ID card, skill upgradation, toolkit incentive, and collateral-free credit.',
    potentialBenefit: '₹15,000 digital toolkit voucher, 5-7 days basic skill training with ₹500/day stipend, and collateral-free enterprise loan up to ₹3 Lakh at 5% interest.',
    whyMatchedReasons: [
      'Tailored specifically for traditional craftsmen, weavers, carpenters, potters, and blacksmiths.',
      '₹15,000 non-repayable grant for purchasing modern toolkits.',
      'Subsidized loan up to ₹3 Lakh with 8% government interest subvention (effective rate only 5%).',
      'PM Vishwakarma Digital ID card and Certificate for government recognition.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 92,
      incomeMatch: 95,
      fundingMatch: 90,
      stageMatch: 90,
      categoryMatch: 95
    },
    eligibilityRules: [
      { criterion: 'Traditional Trade', value: 'Engaged in one of the 18 recognized Vishwakarma trades', status: 'pass', note: 'Recognized trade verified' },
      { criterion: 'Age Limit', value: '18+ years on application date', status: 'pass', note: 'Age criterion met' },
      { criterion: 'Family Restriction', value: 'One member per family eligible for scheme benefits', status: 'pass', note: 'Family rule passed' }
    ],
    requiredDocuments: [
      'Aadhaar Card (linked to active mobile number)',
      'Bank Account Passbook',
      'Ration Card / Family Proof',
      'Proof of Trade Practice (Declaration verified by Gram Panchayat / ULB)'
    ],
    applicationSteps: [
      'Register on pmvishwakarma.gov.in at nearest Common Service Centre (CSC)',
      'Gram Panchayat / Urban Local Body (ULB) conducts Stage 1 verification',
      'District Implementation Committee (DIC) conducts Stage 2 screening',
      'Screening Committee issues PM Vishwakarma ID and provides 5-day training + ₹15,000 toolkit voucher',
      'Bank disburses ₹1 Lakh (1st tranche) loan at 5% concessional interest rate'
    ],
    whereToApply: 'Online at pmvishwakarma.gov.in or nearest Common Service Centre (CSC)',
    officialPortal: 'https://pmvishwakarma.gov.in/',
    isSampleData: true
  },
  {
    id: 'jiogennext',
    name: 'JioGenNext Startup Scaling & Market Access Program',
    shortName: 'JioGenNext',
    schemeType: 'private',
    provider: 'Reliance Industries / JioGenNext',
    providerType: 'Private',
    department: 'Reliance Industries Innovation Ecosystem',
    nodalAgency: 'JioGenNext Platform',
    sector: 'Technology, Software & Agritech Innovation',
    sectorsList: ['Services & Software', 'Information Technology & Agritech', 'Manufacturing'],
    stageEligibility: ['New (Startup)', 'Early-Stage Scaling'],
    targetGroup: ['Technology Startups', 'Innovative Ventures'],
    supportType: ['Market Access', 'Enterprise Pilots', 'Scaling Support', 'No Equity'],
    maxFunding: 'Market Access & Pilot Contracts (Up to ₹1 Crore Ecosystem Value)',
    maxFundingNum: 10000000,
    minFundingNum: 0,
    subsidyRate: 'Zero Equity Taken · Zero Program Charges · 100% Free Ecosystem Access',
    marginMoney: '0% (No equity dilution, no fees charged)',
    status: 'High Match',
    description: 'A dedicated platform by Reliance Industries that helps technology and innovative startups scale, validate products, and access enterprise customers across the vast Reliance ecosystem with zero equity and zero program charges.',
    potentialBenefit: 'Direct commercial pilot opportunities with Reliance business units, zero-equity business scaling, enterprise customer introductions, and senior industry mentorship.',
    whyMatchedReasons: [
      'Technology & innovation focus: Ideal for digital, agritech, and software startups seeking enterprise scale.',
      'Zero-equity & zero-cost model: Full founder ownership retained without dilution.',
      'Enterprise market access: Direct pilot linkages within Reliance telecom, retail, and digital operations.',
      'Comprehensive mentorship on product-market fit, enterprise sales, and growth scaling.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 90,
      incomeMatch: 92,
      fundingMatch: 95,
      stageMatch: 98,
      categoryMatch: 88
    },
    eligibilityRules: [
      { criterion: 'Enterprise Profile', value: 'Technology / Digital Product Startup', status: 'pass', note: 'Must have an innovative product with potential enterprise application' },
      { criterion: 'Program Equity & Fees', value: '0% Equity, No Program Charges', status: 'pass', note: '100% non-dilutive support model' },
      { criterion: 'Product Maturity', value: 'Functional Prototype / MVP / Early Pilot', status: 'pass', note: 'Ready for market testing and pilot deployments' },
      { criterion: 'Applicant Background', value: 'Open to All Indian Founders', status: 'pass', note: 'Evaluated on innovation and market potential' }
    ],
    requiredDocuments: [
      'Pitch Deck & Executive Summary',
      'Product Architecture / Live Demo Link',
      'Certificate of Incorporation (DPIIT recognition advantageous)',
      'Founder Profiles & Current Traction Metrics'
    ],
    applicationSteps: [
      'Submit company and product overview on the official JioGenNext portal',
      'Initial tech validation and screening by JioGenNext evaluation team',
      'Virtual demo and interaction with Reliance domain specialists',
      'Induction into the Market Access cohort with structured commercial pilot roadmaps'
    ],
    whereToApply: 'Online via official portal: jiogennext.com',
    officialPortal: 'https://www.jiogennext.com',
    isSampleData: false
  },
  {
    id: 'reliance-foundation-women',
    name: 'Reliance Foundation Women Entrepreneurship Initiative',
    shortName: 'RF Women',
    schemeType: 'csr',
    provider: 'Reliance Foundation',
    providerType: 'CSR / Philanthropic',
    department: 'Reliance Foundation Women Empowerment & Livelihoods',
    nodalAgency: 'Reliance Foundation Grassroots Network',
    sector: 'Women Livelihoods, Agro-Processing, Handloom & Retail',
    sectorsList: ['Textiles & Handloom', 'Food Products & Spices', 'Food Processing & Agro', 'Retail & Trade'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)', 'Livelihood Enterprise'],
    targetGroup: ['Women Entrepreneurs', 'Rural Women', 'Livelihood Collectives'],
    supportType: ['Entrepreneurship Training', 'Productive Assets', 'Market Access', 'Finance & Tech Access'],
    maxFunding: 'Grants & Productive Assets (Up to ₹5 Lakh Support Value)',
    maxFundingNum: 500000,
    minFundingNum: 25000,
    subsidyRate: '100% Philanthropic/CSR Funded Asset & Skill Support',
    marginMoney: '0% (Non-repayable CSR support)',
    status: 'Strong Match',
    description: 'A flagship CSR initiative by Reliance Foundation to strengthen women’s economic independence through entrepreneurship skills, productive asset creation, digital literacy, and retail supply-chain linkages.',
    potentialBenefit: 'Access to seed grants, high-quality production equipment, packaging assistance, retail marketplace access, and financial linkage for women-led nano-enterprises.',
    whyMatchedReasons: [
      'Dedicated women entrepreneurship mission: Prioritizes female-owned micro and livelihood enterprises.',
      'Productive assets & machinery: Provision of modern tools to scale production capacity.',
      'Market access linkage: Distribution support through partner retail networks and rural haats.',
      'Hands-on financial management, bookkeeping, and digital payment training.'
    ],
    factorScores: {
      sectorMatch: 95,
      locationMatch: 96,
      incomeMatch: 95,
      fundingMatch: 94,
      stageMatch: 92,
      categoryMatch: 98
    },
    eligibilityRules: [
      { criterion: 'Gender Leadership', value: 'Woman Owned / Women Led Enterprise', status: 'pass', note: 'Exclusively intended for women founders and women groups' },
      { criterion: 'Business Scale', value: 'Micro / Grassroots / Rural Enterprise', status: 'pass', note: 'Targeted at community livelihoods and self-employed women' },
      { criterion: 'Social Relevance', value: 'Livelihood & Income Generation', status: 'pass', note: 'Demonstrates tangible household income improvement' }
    ],
    requiredDocuments: [
      'Identity Proof (Aadhaar Card of Woman Entrepreneur)',
      'Bank Account Passbook (Aadhaar-linked)',
      'Proof of Business Activity or Livelihood Setup',
      'Brief Project Proposal or Community Referral'
    ],
    applicationSteps: [
      'Register through Reliance Foundation outreach partners or online portal',
      'Community livelihood needs assessment by field coordinators',
      'Enrolment in capacity building & production modernization module',
      'Direct provision of productive assets and retail channel linkages'
    ],
    whereToApply: 'Online at reliancefoundation.org or through local community project desks',
    officialPortal: 'https://www.reliancefoundation.org/what-we-do/women-empowerment/women-entrepreneurship',
    isSampleData: false
  },
  {
    id: 'swayamshree-scheme',
    name: 'Swayamshree Rural Women Enterprise & Livelihoods Initiative',
    shortName: 'Swayamshree',
    schemeType: 'csr',
    provider: 'Reliance Foundation + Gates Foundation + SRLM',
    providerType: 'CSR / Philanthropic',
    department: 'CSR Partnership with State Rural Livelihood Missions',
    nodalAgency: 'State Rural Livelihood Missions (MP, Gujarat, Odisha & Partner States)',
    sector: 'Rural Collectives, Food Processing & Agro Value-Chains',
    sectorsList: ['Food Processing & Agro', 'Food Products & Spices', 'Textiles & Handloom', 'Retail & Trade'],
    stageEligibility: ['New (Startup)', 'Existing (Expansion)', 'Women Collective (SHG)'],
    targetGroup: ['Women in Livelihoods', 'Rural SHGs', 'Grassroots Collectives'],
    supportType: ['Revolving Grants', 'Asset Development', 'Value-Chain Linkages', 'Market Opportunities'],
    maxFunding: 'Revolving Capital & Enterprise Asset Grants (Up to ₹4 Lakh per unit/collective)',
    maxFundingNum: 400000,
    minFundingNum: 20000,
    subsidyRate: 'Catalytic Philanthropic Grant + Concessional SRLM Micro-Credit Linkage',
    marginMoney: '0% to 5% (Co-funded with State SRLM)',
    status: 'High Match',
    description: 'Developed in partnership between Reliance Foundation, the Bill & Melinda Gates Foundation, and State Rural Livelihood Missions to transform rural women collectives into viable commercial nano-enterprises.',
    potentialBenefit: 'Collective working capital, modern food and spice processing equipment, quality certification support, and structured sales tie-ups with district agricultural marts.',
    whyMatchedReasons: [
      'Women-focused collective model: Tailored for individual women and SHG-promoted micro-units.',
      'State Rural Livelihood Mission backing: Integrated with state government institutional infrastructure.',
      'End-to-end value addition: From raw material procurement to branded packaging and sales.',
      'Revolving fund assistance enabling flexible working capital management.'
    ],
    factorScores: {
      sectorMatch: 92,
      locationMatch: 95,
      incomeMatch: 94,
      fundingMatch: 92,
      stageMatch: 90,
      categoryMatch: 96
    },
    eligibilityRules: [
      { criterion: 'Target Beneficiary', value: 'Women Entrepreneurs / SHG Livelihood Groups', status: 'pass', note: 'Focused on women engaged in productive economic activity' },
      { criterion: 'Geographic Priority', value: 'Madhya Pradesh, Gujarat, Odisha & Rural Clusters', status: 'pass', note: 'Priority in SRLM-partnered districts' },
      { criterion: 'Sector Focus', value: 'Agro-processing, Handloom, Spices, Rural Craft', status: 'pass', note: 'Must add value to local rural commodities' }
    ],
    requiredDocuments: [
      'Aadhaar Card of Woman Entrepreneur or Group Leader',
      'SHG / Group Affiliation Certificate from Village Organization (if group)',
      'Bank Account Passbook',
      'Brief Outline of Enterprise Activity'
    ],
    applicationSteps: [
      'Contact local Gram Panchayat VO / SRLM Cluster Coordinator',
      'Enterprise appraisal and group viability verification',
      '3-day enterprise and financial record-keeping workshop',
      'Fund release and equipment delivery via program partners'
    ],
    whereToApply: 'Block SRLM Mission Office or Reliance Foundation Field Partner Desks',
    officialPortal: 'https://www.reliancefoundation.org',
    isSampleData: false
  },
  {
    id: 'tata-social-enterprise',
    name: 'Tata Social Enterprise Challenge (TSEC)',
    shortName: 'TSEC',
    schemeType: 'private',
    provider: 'Tata Sons + IIM Calcutta Innovation Park',
    providerType: 'Private / Incubation',
    department: 'Tata Group Corporate Sustainability Initiative',
    nodalAgency: 'IIM Calcutta Innovation Park (IIMCIP)',
    sector: 'Social Enterprise, Agritech, CleanTech, Healthcare & Handicrafts',
    sectorsList: ['Information Technology & Agritech', 'Services & Software', 'Food Processing & Agro', 'Manufacturing'],
    stageEligibility: ['Early-Stage Social Enterprise', 'Proof-of-Concept / Prototype'],
    targetGroup: ['Social Entrepreneurs', 'Impact Startups', 'Early-Stage Founders'],
    supportType: ['Cash Prizes', 'Incubation', 'Mentorship', 'Seed Funding Opportunity', 'Investor Pitching'],
    maxFunding: 'Cash Awards up to ₹10 Lakh + Seed Funding Opportunity up to ₹1 Crore',
    maxFundingNum: 10000000,
    minFundingNum: 100000,
    subsidyRate: 'Non-Dilutive Cash Awards + Equity Seed Funding Opportunity up to ₹1 Crore',
    marginMoney: '0% (Competition and incubation based)',
    status: 'High Match',
    description: 'A joint initiative by Tata Sons and IIM Calcutta to identify and mentor early-stage social enterprises that create measurable positive impact on society, environment, or marginalized populations across India.',
    potentialBenefit: 'Cash awards, prestigious incubation at IIM Calcutta Innovation Park, mentorship from Tata executive leadership, and exclusive opportunity to pitch to social impact investors for seed funding up to ₹1 Crore.',
    whyMatchedReasons: [
      'Social impact focus: Supports enterprises addressing agricultural, rural, healthcare, and educational needs.',
      'Premier IIM Calcutta incubation: Structured advisory, legal setup, and business model scaling.',
      'Significant seed capital access: Finalists eligible to pitch for up to ₹1 Crore impact investment.',
      'High brand credibility and national investor network under the Tata umbrella.'
    ],
    factorScores: {
      sectorMatch: 94,
      locationMatch: 88,
      incomeMatch: 90,
      fundingMatch: 96,
      stageMatch: 96,
      categoryMatch: 90
    },
    eligibilityRules: [
      { criterion: 'Social Impact', value: 'Measurable Positive Social or Environmental Impact', status: 'pass', note: 'Must solve a significant societal problem in India' },
      { criterion: 'Venture Stage', value: 'Early Stage with Proof-of-Concept (POC)', status: 'pass', note: 'Working prototype or early customer validation required' },
      { criterion: 'Team Composition', value: 'Max 2 Members Representing Team', status: 'pass', note: 'Founders must lead the application and pitch' },
      { criterion: 'Operating Territory', value: 'Registered & Operating in India', status: 'pass', note: 'All Indian social enterprises eligible' }
    ],
    requiredDocuments: [
      'Social Impact Pitch Deck & Executive Summary',
      'Proof of Concept (POC) / Product Demo Video',
      'Venture Registration Certificate (if registered)',
      'Financial Plan & Social Return on Investment (SROI) projection'
    ],
    applicationSteps: [
      'Submit business plan and pitch deck on tatasechallenge.org',
      'Regional screening and evaluation by IIM Calcutta academic & investor jury',
      'Semi-finalist bootcamp, mentoring sessions, and investor pitch preparation',
      'Grand Finale pitch before Tata leaders, venture capitalists, and seed fund committee'
    ],
    whereToApply: 'Online via official portal: tatasechallenge.org',
    officialPortal: 'https://www.tatasechallenge.org',
    isSampleData: false
  }
];

// Authoritative Deterministic Normalized 100-Point 5-Factor Match Calculator
// Sector (30%) + Quota (25%) + Capital (20%) + Location (15%) + Age (10%)
export function evaluateScheme(scheme, profile = {}) {
  const sector = (profile?.sector || '').trim().toLowerCase();
  const category = (profile?.socialCategory || profile?.category || '').trim().toUpperCase();
  const gender = (profile?.gender || '').trim().toLowerCase();
  const location = (profile?.locationType || profile?.location || '').trim().toLowerCase();
  const state = (profile?.state || '').trim().toLowerCase();
  const age = Number(profile?.age || 0);

  let rawFunding = profile?.fundingRequiredNum || profile?.fundingNeeded || profile?.fundingRequired || 500000;
  let fundingNum = 0;
  if (typeof rawFunding === 'string') {
    const cleaned = rawFunding.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    if (rawFunding.toLowerCase().includes('lakh') || rawFunding.toLowerCase().includes('lac')) {
      fundingNum = num * 100000;
    } else if (rawFunding.toLowerCase().includes('cr')) {
      fundingNum = num * 10000000;
    } else {
      fundingNum = num || 0;
    }
  } else {
    fundingNum = Number(rawFunding) || 0;
  }

  const schemeId = (scheme?.id || '').toLowerCase();
  const minFunding = Number(scheme?.minFundingNum || 0);
  const maxFunding = Number(scheme?.maxFundingNum || 100000000);

  const matchedRules = [];
  const failedRules = [];
  const missingRequirements = [];
  const reasons = [];
  let isDisqualified = false;

  // 1. Age Factor (10%) - Hard Gate >= 18
  let ageScore = 100;
  if (age > 0) {
    if (age < 18) {
      ageScore = 0;
      isDisqualified = true;
      failedRules.push('Applicant is below statutory minimum age requirement of 18 years');
    } else if (age >= 18 && age <= 65) {
      ageScore = 100;
      matchedRules.push(`Applicant age (${age} yrs) satisfies adult entrepreneur criteria (18-65)`);
    } else {
      ageScore = 70;
      matchedRules.push(`Age (${age} yrs) above optimal 65 band`);
    }
  } else {
    ageScore = 50;
  }

  // 2. Sector Factor (30%)
  let sectorScore = 50;
  const schemeSectors = (scheme?.sectorsList || []).map(s => s.toLowerCase());
  const schemeSectorText = (scheme?.sector || '').toLowerCase();
  const isExactSector = schemeSectors.some(s => s.includes(sector) || sector.includes(s));
  const isTextMatch = schemeSectorText.includes(sector);

  if (schemeId.includes('pmfme')) {
    if (sector.includes('food') || sector.includes('agro') || sector.includes('spice') || sector.includes('dairy') || sector.includes('bakery')) {
      sectorScore = 100;
      matchedRules.push('Sector matches PMFME food processing focus');
      reasons.push('Eligible for 35% credit-linked capital subsidy up to ₹10 Lakh');
    } else {
      sectorScore = 10;
      isDisqualified = true;
      failedRules.push('PMFME is strictly restricted to food processing & agro units');
    }
  } else if (schemeId.includes('vishwakarma')) {
    if (sector.includes('handloom') || sector.includes('artisan') || sector.includes('craft') || sector.includes('textile')) {
      sectorScore = 100;
      matchedRules.push('Traditional artisan sector matches PM Vishwakarma trades');
      reasons.push('Eligible for ₹15,000 toolkit voucher + 5% concessional credit');
    } else {
      sectorScore = 20;
    }
  } else if (schemeId.includes('cgss') || schemeId.includes('startup-seed') || schemeId.includes('jiogennext')) {
    if (sector.includes('tech') || sector.includes('software') || (profile?.stage || '').toLowerCase().includes('startup')) {
      sectorScore = 100;
      matchedRules.push('Technology/startup profile matches innovation incubator guidelines');
    } else {
      sectorScore = 40;
    }
  } else if (isExactSector || isTextMatch || (schemeSectorText && sector.toLowerCase().split(/[\s,&/]+/).filter(w => w.length >= 4).some(w => schemeSectorText.includes(w) || schemeSectors.some(s => s.includes(w))))) {
    sectorScore = 100;
    matchedRules.push(`Sector '${profile?.sector}' is explicitly covered`);
  } else if (schemeSectors.some(s => s.includes('all') || s.includes('manufacturing') || s.includes('services'))) {
    sectorScore = 80;
  } else {
    sectorScore = 30;
  }

  // 3. Affirmative Action & Quota (25%)
  let quotaScore = 75;
  const isSCST = category.includes('SC') || category.includes('ST');
  const isOBC = category.includes('OBC');
  const isWoman = gender === 'female' || gender === 'woman';
  const isSpecial = isSCST || isOBC || isWoman || category.includes('MINORITY');

  if (schemeId.includes('standup') || schemeId.includes('stand-up')) {
    if (isWoman || isSCST) {
      quotaScore = 100;
      matchedRules.push(`Applicant satisfies Stand-Up India reservation (${isWoman ? 'Woman' : 'SC/ST'})`);
      reasons.push('Composite bank loan from ₹10 Lakh to ₹1 Crore for greenfield units');
    } else {
      quotaScore = 0;
      isDisqualified = true;
      failedRules.push('Stand-Up India is strictly reserved for SC, ST, or Women entrepreneurs');
    }
  } else if (schemeId.includes('nssh') || schemeId.includes('sc-st-hub')) {
    if (isSCST) {
      quotaScore = 100;
      matchedRules.push('Verified SC/ST category qualifies for National SC-ST Hub subsidy');
      reasons.push('25% Special Capital Subsidy on plant & machinery up to ₹25 Lakh');
    } else {
      quotaScore = 0;
      isDisqualified = true;
      failedRules.push('National SC-ST Hub (NSSH) benefits are exclusively for SC/ST');
    }
  } else if (schemeId.includes('reliance-foundation-women') || schemeId.includes('swayamshree')) {
    if (isWoman) {
      quotaScore = 100;
      matchedRules.push('Applicant satisfies Women Entrepreneurship mandate');
    } else {
      quotaScore = 0;
      isDisqualified = true;
      failedRules.push('Exclusively designed for Women-led enterprises');
    }
  } else if (schemeId.includes('pmegp')) {
    if (isSpecial) {
      quotaScore = 100;
      matchedRules.push('Special Category quota qualifies for highest 35% capital subsidy and 5% own contribution');
      reasons.push('Highest subsidy bracket (35%) and reduced 5% margin money');
    } else {
      quotaScore = 75;
    }
  } else {
    quotaScore = isSpecial ? 95 : 75;
  }

  // 4. Capital Feasibility (20%)
  let capitalScore = 80;
  if (fundingNum > 0) {
    if (fundingNum > maxFunding * 2) {
      capitalScore = 0;
      isDisqualified = true;
      failedRules.push(`Project cost (₹${(fundingNum / 100000).toFixed(1)}L) severely exceeds statutory ceiling (₹${(maxFunding / 100000).toFixed(1)}L)`);
    } else if (fundingNum > maxFunding) {
      capitalScore = 40;
      failedRules.push(`Project cost exceeds ceiling of ₹${(maxFunding / 100000).toFixed(1)}L`);
    } else if (fundingNum < minFunding) {
      capitalScore = 50;
    } else {
      capitalScore = 100;
      matchedRules.push(`Project cost falls within scheme limits (₹${(minFunding / 100000).toFixed(1)}L - ₹${(maxFunding / 100000).toFixed(1)}L)`);
    }
  }

  // 5. Location Factor (15%)
  let locationScore = 80;
  const isRural = location.includes('rural') || location.includes('village') || location.includes('panchayat');

  if (schemeId.includes('swayamshree')) {
    const eligibleStates = ['madhya pradesh', 'gujarat', 'odisha'];
    if (eligibleStates.some(st => state.includes(st) || location.includes(st))) {
      locationScore = 100;
      matchedRules.push('Applicant state is an approved cluster territory for Swayamshree');
    } else {
      locationScore = 0;
      isDisqualified = true;
      failedRules.push('Swayamshree is operational only in MP, Gujarat, and Odisha');
    }
  } else if (schemeId.includes('pmegp')) {
    if (isRural) {
      locationScore = 100;
      matchedRules.push('Rural location qualifies for maximum 35% subsidy tier');
      reasons.push('Rural Village Panchayat location maximizes grant allocation');
    } else {
      locationScore = 80;
    }
  } else {
    locationScore = 90;
  }

  // Final 100-point normalized compatibility score
  const matchScore = Math.round(
    (sectorScore * 0.30) +
    (quotaScore * 0.25) +
    (capitalScore * 0.20) +
    (locationScore * 0.15) +
    (ageScore * 0.10)
  );

  let eligibilityStatus = 'eligible';
  if (isDisqualified || failedRules.length > 0) {
    eligibilityStatus = 'not_eligible';
  } else if (missingRequirements.length > 0 || capitalScore < 70) {
    eligibilityStatus = 'conditionally_eligible';
  }

  let status = 'Moderate Match';
  if (eligibilityStatus === 'not_eligible') {
    status = 'Ineligible';
  } else if (matchScore >= 90) {
    status = 'Very High Match';
  } else if (matchScore >= 80) {
    status = 'High Match';
  } else if (matchScore >= 70) {
    status = 'Strong Match';
  }

  return {
    matchScore: Math.min(100, Math.max(0, matchScore)),
    eligibilityStatus,
    status,
    factorScores: {
      sectorMatch: sectorScore,
      categoryMatch: quotaScore,
      fundingMatch: capitalScore,
      locationMatch: locationScore,
      ageMatch: ageScore,
      sector: sectorScore,
      quota: quotaScore,
      capital: capitalScore,
      location: locationScore,
      age: ageScore
    },
    matchedRules,
    failedRules,
    missingRequirements,
    whyMatchedReasons: reasons.length > 0 ? reasons : matchedRules.slice(0, 4)
  };
}

export function calculateMatchScore(scheme, profile) {
  const res = evaluateScheme(scheme, profile);
  return res.matchScore;
}

