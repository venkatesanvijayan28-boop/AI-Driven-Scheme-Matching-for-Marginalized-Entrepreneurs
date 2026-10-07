// Verified Indian Investor Networks & Matching Platforms for SchemeMatch AI
// Categorized by Capital Investment Tiers:
// Tier A — ₹1 Crore+ (Large Capital / Growth / Expansion)
// Tier B — ₹10 Lakh – ₹1 Crore (Medium Capital / Seed / Early Growth)
// Tier C — Below ₹10 Lakh (Small Capital / Idea / MVP / Micro business)

export const INVESTORS_DATABASE = [
  {
    id: 'startup-india-connect',
    name: 'Startup India Investor Connect',
    organization: 'DPIIT, Ministry of Commerce & Industry, Govt of India',
    investorType: 'Government Investor Connect Platform',
    tier: 'Tier B',
    tierLabel: 'Tier B — Medium Capital (₹10 Lakh – ₹1 Crore+)',
    minInvestment: 500000,
    maxInvestment: 50000000,
    investmentRangeText: '₹5 Lakh – ₹5 Crore',
    preferredStages: ['Idea', 'MVP', 'New (Startup)', 'Seed Stage', 'Early Growth', 'Growth'],
    preferredSectors: [
      'Food Processing & Agro',
      'Information Technology & Agritech',
      'Manufacturing',
      'Services & Software',
      'Textiles & Handloom',
      'Food Products & Spices',
      'All Sectors'
    ],
    preferredLocations: ['All India', 'Tamil Nadu', 'Karnataka', 'Kerala', 'Pan-India'],
    impactFocus: ['Marginalized Founders', 'Women Entrepreneurs', 'Tier-2/3 Cities', 'Social Impact'],
    equityPreference: 'Equity / CCD / Safe Notes (Typically 3% – 10%)',
    mentorshipAvailable: true,
    marketAccessAvailable: true,
    networkingAvailable: true,
    activeStatus: true,
    lastVerified: 'September 2026',
    officialUrl: 'https://www.startupindia.gov.in',
    description: 'Official Government of India investor discovery and match platform connecting DPIIT-registered startups with leading angel syndicates, venture funds, and institutional investors with direct co-investment facilitation.',
    strengths: [
      'Direct central government backed validation & credibility',
      'Access to 400+ accredited angel networks & institutional funds',
      'Zero application fees or facilitation commission'
    ]
  },
  {
    id: 'indian-angel-network',
    name: 'Indian Angel Network (IAN)',
    organization: 'Indian Angel Network',
    investorType: 'Angel Investor Network',
    tier: 'Tier A',
    tierLabel: 'Tier A — Large Capital (₹1 Crore+)',
    minInvestment: 2500000,
    maxInvestment: 85000000,
    investmentRangeText: '₹25 Lakh – ₹8.5 Crore (Up to $1M)',
    preferredStages: ['MVP', 'New (Startup)', 'Seed Stage', 'Early Growth', 'Growth'],
    preferredSectors: [
      'Food Processing & Agro',
      'Information Technology & Agritech',
      'Manufacturing',
      'Services & Software',
      'Healthcare',
      'Social Impact'
    ],
    preferredLocations: ['All India', 'Pan-India', 'Tamil Nadu', 'Karnataka'],
    impactFocus: ['High-Growth Innovation', 'Rural Transformation', 'Women Founders'],
    equityPreference: 'Equity (Typically 10% – 20%)',
    mentorshipAvailable: true,
    marketAccessAvailable: true,
    networkingAvailable: true,
    activeStatus: true,
    lastVerified: 'September 2026',
    officialUrl: 'https://www.indianangelnetwork.com/',
    description: 'India’s pioneer and largest angel investor network with over 500 business leaders investing in early-stage enterprises across agriculture, healthcare, IT, and manufacturing, providing mentorship and market reach.',
    strengths: [
      'Extensive mentorship by veteran founders & corporate leaders',
      'High syndication capacity up to $1M ticket sizes',
      'Strong cross-border and pan-India commercial market access'
    ]
  },
  {
    id: 'angeltech',
    name: 'AngelTech',
    organization: 'AngelTech Innovation Syndicate',
    investorType: 'Technology Angel Platform',
    tier: 'Tier B',
    tierLabel: 'Tier B — Medium Capital (₹10 Lakh – ₹1 Crore)',
    minInvestment: 1000000,
    maxInvestment: 10000000,
    investmentRangeText: '₹10 Lakh – ₹1 Crore',
    preferredStages: ['Idea', 'MVP', 'New (Startup)', 'Seed Stage'],
    preferredSectors: [
      'Information Technology & Agritech',
      'Food Processing & Agro',
      'Manufacturing',
      'Services & Software',
      'CleanTech',
      'HealthTech'
    ],
    preferredLocations: ['All India', 'Tamil Nadu', 'Karnataka', 'Kerala', 'Pan-India'],
    impactFocus: ['Tech-Enabled Startups', 'Green Innovation', 'AgriTech Automation'],
    equityPreference: 'Equity / SAFE (5% – 12%)',
    mentorshipAvailable: true,
    marketAccessAvailable: true,
    networkingAvailable: true,
    activeStatus: true,
    lastVerified: 'September 2026',
    officialUrl: 'https://www.angeltech.in/',
    description: 'Specialized angel platform focused on tech-enabled startups across AgriTech, HealthTech, EV, CleanTech, and IT, connecting founders with accredited technology investors and rapid syndication.',
    strengths: [
      'Deep sector expertise in AgriTech, EV, and DeepTech',
      'Fast-track screening & syndicate closing cycles',
      'Hands-on technical and product architecture advisory'
    ]
  },
  {
    id: 'epifunds',
    name: 'EPIFUNDS',
    organization: 'EPIFUNDS Angel Syndicate',
    investorType: 'Curated Angel Network',
    tier: 'Tier A',
    tierLabel: 'Tier A — Large Capital (₹1 Crore+)',
    minInvestment: 5000000,
    maxInvestment: 100000000,
    investmentRangeText: '₹50 Lakh – ₹10 Crore',
    preferredStages: ['Seed Stage', 'Early Growth', 'Growth', 'Expansion'],
    preferredSectors: [
      'Food Processing & Agro',
      'Information Technology & Agritech',
      'Manufacturing',
      'Services & Software',
      'Consumer Tech'
    ],
    preferredLocations: ['All India', 'Pan-India'],
    impactFocus: ['Scalable Commercial Models', 'Proven Traction'],
    equityPreference: 'Equity (7% – 15%)',
    mentorshipAvailable: true,
    marketAccessAvailable: false,
    networkingAvailable: true,
    activeStatus: true,
    lastVerified: 'September 2026',
    officialUrl: 'https://epifunds.com/',
    description: 'Curated angel platform connecting vetted founders with accredited individual investors, high-net-worth individuals, and family offices for multi-crore equity rounds.',
    strengths: [
      'Single application to reach a syndicate of 250+ vetted angels',
      'Simplified cap table management via SPV structure',
      'Strong support for post-seed expansion capital'
    ]
  },
  {
    id: 'ynos-platform',
    name: 'YNOS Investor Platform',
    organization: 'YNOS Venture Engine (IIT Madras Incubated)',
    investorType: 'Investor Discovery & Intelligence Platform',
    tier: 'Tier C',
    tierLabel: 'Tier C — Small Capital (Below ₹10 Lakh)',
    minInvestment: 200000,
    maxInvestment: 20000000,
    investmentRangeText: '₹2 Lakh – ₹2 Crore',
    preferredStages: ['Idea', 'MVP', 'New (Startup)', 'Seed Stage', 'Early Growth'],
    preferredSectors: [
      'Food Processing & Agro',
      'Textiles & Handloom',
      'Information Technology & Agritech',
      'Food Products & Spices',
      'Manufacturing',
      'Services & Software',
      'All Sectors'
    ],
    preferredLocations: ['All India', 'Tamil Nadu', 'Karnataka', 'Kerala', 'Pan-India'],
    impactFocus: ['Academic Spin-offs', 'First-Generation Founders', 'Marginalized Entrepreneurs'],
    equityPreference: 'Grants / Equity / Convertible Debentures',
    mentorshipAvailable: true,
    marketAccessAvailable: true,
    networkingAvailable: true,
    activeStatus: true,
    lastVerified: 'September 2026',
    officialUrl: 'https://www.ynos.in/',
    description: 'Incubated at IIT Madras, YNOS provides advanced intelligence and matching between early-stage entrepreneurs, angel networks, seed funds, incubators, and government grants with transparent analytics.',
    strengths: [
      'Data-driven investor matchmaking powered by IIT Madras research',
      'Accessible to idea, prototype, and micro businesses',
      'Comprehensive database of 10,000+ angels, VCs, and grant schemes'
    ]
  },
  {
    id: 'impact-investors-council',
    name: 'Impact Investors Council (IIC)',
    organization: 'Impact Investors Council (Member Directory: Aavishkaar, Acumen, Avaana, Elevar)',
    investorType: 'Impact Investment Ecosystem',
    tier: 'Tier A',
    tierLabel: 'Tier A — Large Capital (₹1 Crore+)',
    minInvestment: 10000000,
    maxInvestment: 250000000,
    investmentRangeText: '₹1 Crore – ₹25 Crore',
    preferredStages: ['Seed Stage', 'Early Growth', 'Growth', 'Expansion'],
    preferredSectors: [
      'Food Processing & Agro',
      'Textiles & Handloom',
      'Food Products & Spices',
      'Healthcare',
      'Financial Inclusion',
      'Rural Livelihoods'
    ],
    preferredLocations: ['All India', 'Rural & Semi-Urban India', 'Tamil Nadu', 'Karnataka', 'Kerala'],
    impactFocus: ['Rural Livelihoods', 'Women Empowerment', 'Financial Inclusion', 'SC/ST Beneficiaries', 'Climate Resilience'],
    equityPreference: 'Patient Equity / Blended Impact Finance',
    mentorshipAvailable: true,
    marketAccessAvailable: true,
    networkingAvailable: true,
    activeStatus: true,
    lastVerified: 'September 2026',
    officialUrl: 'https://iiic.in/',
    description: 'Industry association of India’s leading impact investors (Aavishkaar, Acumen, Elevar Equity, Caspian) deploying patient capital into enterprises generating measurable social and livelihood benefits.',
    strengths: [
      'Dedicated mandate for social, rural, and marginalized empowerment',
      'Patient capital with long-term 7–10 year horizon',
      'Deep expertise in grassroots distribution and rural value chains'
    ]
  },
  {
    id: 'native-angel-network',
    name: 'Native Angel Network (NAN)',
    organization: 'Nativelead Foundation',
    investorType: 'Regional / Tier 2-3 Angel Network',
    tier: 'Tier C',
    tierLabel: 'Tier C — Small Capital (Below ₹10 Lakh)',
    minInvestment: 300000,
    maxInvestment: 2500000,
    investmentRangeText: '₹3 Lakh – ₹25 Lakh',
    preferredStages: ['Idea', 'MVP', 'New (Startup)', 'Seed Stage'],
    preferredSectors: [
      'Food Processing & Agro',
      'Textiles & Handloom',
      'Food Products & Spices',
      'Manufacturing',
      'Agri-Allied & Dairy'
    ],
    preferredLocations: ['Tamil Nadu', 'South India', 'Rural', 'Semi-Urban'],
    impactFocus: ['Rural Youth', 'Tier-2/3 Towns', 'Traditional Artisans & Farmers', 'Women'],
    equityPreference: 'Equity (5% – 15%)',
    mentorshipAvailable: true,
    marketAccessAvailable: true,
    networkingAvailable: true,
    activeStatus: true,
    lastVerified: 'September 2026',
    officialUrl: 'https://nativelead.org/',
    description: 'India’s pioneer regional angel network dedicated to native and non-metro entrepreneurs in Tamil Nadu and South India, investing patient capital in agriculture, handlooms, and rural crafts.',
    strengths: [
      'High affinity for rural, tier-2/3 towns and native traditions',
      'Low entry ticket threshold suitable for micro-enterprises',
      'Regional business icons offering localized mentorship'
    ]
  },
  {
    id: 'villgro-innovations',
    name: 'Villgro Innovations Foundation',
    organization: 'Villgro Innovations',
    investorType: 'Social Enterprise Incubator & Seed Fund',
    tier: 'Tier B',
    tierLabel: 'Tier B — Medium Capital (₹10 Lakh – ₹1 Crore)',
    minInvestment: 1000000,
    maxInvestment: 6500000,
    investmentRangeText: '₹10 Lakh – ₹65 Lakh',
    preferredStages: ['Idea', 'MVP', 'New (Startup)', 'Seed Stage'],
    preferredSectors: [
      'Food Processing & Agro',
      'Information Technology & Agritech',
      'Healthcare',
      'Manufacturing',
      'Food Products & Spices'
    ],
    preferredLocations: ['All India', 'Tamil Nadu', 'Karnataka', 'Kerala'],
    impactFocus: ['Social Impact', 'Women-Led Enterprises', 'Smallholder Farmers', 'Clean Energy'],
    equityPreference: 'Grant + Concessional Seed Equity / Debt',
    mentorshipAvailable: true,
    marketAccessAvailable: true,
    networkingAvailable: true,
    activeStatus: true,
    lastVerified: 'September 2026',
    officialUrl: 'https://villgro.org/',
    description: 'Pioneering social enterprise incubator and impact fund providing blended financing, grant capital, incubation, and go-to-market mentorship to early-stage innovators solving grassroots challenges.',
    strengths: [
      'Blended capital structure combining non-dilutive grants & seed equity',
      'Intensive incubation with dedicated business mentor',
      'Global network of impact partners and corporate buyers'
    ]
  }
];

// Determine entrepreneur's investment tier based on requested capital
export function getEntrepreneurTier(fundingAmountNum) {
  if (!fundingAmountNum || fundingAmountNum < 1000000) {
    return {
      tier: 'Tier C',
      label: 'Tier C — Small Capital (< ₹10 Lakh)',
      rangeText: 'Up to ₹10 Lakh',
      suitableTypes: 'Micro Seed, Angel Incubators, Regional Angels'
    };
  } else if (fundingAmountNum <= 10000000) {
    return {
      tier: 'Tier B',
      label: 'Tier B — Medium Capital (₹10 Lakh – ₹1 Crore)',
      rangeText: '₹10 Lakh – ₹1 Crore',
      suitableTypes: 'Angel Networks, Early-Stage VC, Seed Platforms'
    };
  } else {
    return {
      tier: 'Tier A',
      label: 'Tier A — Large Capital (₹1 Crore+)',
      rangeText: '₹1 Crore and above',
      suitableTypes: 'Venture Capital, Impact Funds, Institutional Angels'
    };
  }
}

// Multi-factor AI compatibility score calculation for investors
export function calculateInvestorMatchScore(investor, profile) {
  let score = 0;
  const whyMatched = [];
  let potentialGap = '';

  const fundingReq = profile.fundingRequiredNum || 500000;
  const entrepreneurSector = profile.sector || 'Food Processing & Agro';
  const entrepreneurState = profile.state || 'Tamil Nadu';
  const stage = profile.stage || 'New (Startup)';
  const isSocialImpact = profile.socialCategory?.includes('Women') || 
                         profile.socialCategory?.includes('SC') || 
                         profile.socialCategory?.includes('ST') ||
                         profile.socialCategory?.includes('Rural') ||
                         profile.locationType === 'Rural';

  // 1. Sector Match (25% weight)
  const sectorMatches = investor.preferredSectors.some(s => 
    s.toLowerCase() === 'all sectors' || 
    s.toLowerCase() === entrepreneurSector.toLowerCase() ||
    entrepreneurSector.toLowerCase().includes(s.toLowerCase())
  );

  if (sectorMatches) {
    score += 25;
    whyMatched.push(`Sector Alignment: Focuses on ${entrepreneurSector}`);
  } else {
    score += 10;
    potentialGap = `Primary sector (${entrepreneurSector}) differs from core thesis, though cross-sector syndication may apply.`;
  }

  // 2. Stage Match (20% weight)
  const stageMatches = investor.preferredStages.some(st => 
    st.toLowerCase().includes('startup') || 
    st.toLowerCase().includes('seed') ||
    st.toLowerCase() === stage.toLowerCase() ||
    (stage.includes('New') && (st === 'Idea' || st === 'MVP' || st === 'New (Startup)')) ||
    (stage.includes('Existing') && (st === 'Early Growth' || st === 'Growth' || st === 'Expansion'))
  );

  if (stageMatches) {
    score += 20;
    whyMatched.push(`Business Stage Fit: Actively backs ${stage} ventures`);
  } else {
    score += 8;
    if (!potentialGap) potentialGap = `Prefers alternative stages, though mature traction may qualify.`;
  }

  // 3. Funding Ticket Range Match (20% weight)
  if (fundingReq >= investor.minInvestment && fundingReq <= investor.maxInvestment) {
    score += 20;
    whyMatched.push(`Funding Range Match: Your requirement (${profile.fundingRequired}) falls within stated ticket band (${investor.investmentRangeText})`);
  } else if (fundingReq < investor.minInvestment) {
    const diff = investor.minInvestment - fundingReq;
    if (diff <= 1000000) {
      score += 12;
      whyMatched.push(`Near Ticket Range: Co-investment or syndicate syndication available`);
      if (!potentialGap) potentialGap = `Minimum ticket is ₹${(investor.minInvestment / 100000).toFixed(1)}L; you may need to raise a slightly larger round or syndicate.`;
    } else {
      score += 5;
      if (!potentialGap) potentialGap = `Minimum ticket size is higher than current ask. Suitable for future scale-up round.`;
    }
  } else {
    score += 10;
    if (!potentialGap) potentialGap = `Requirement exceeds standard single-ticket ceiling; syndication across multiple members required.`;
  }

  // 4. Geography Match (10% weight)
  const locMatches = investor.preferredLocations.some(l => 
    l.toLowerCase() === 'all india' || 
    l.toLowerCase() === 'pan-india' ||
    l.toLowerCase().includes(entrepreneurState.toLowerCase())
  );

  if (locMatches) {
    score += 10;
    whyMatched.push(`Geographic Coverage: Active deployment across ${entrepreneurState} / Pan-India`);
  } else {
    score += 5;
  }

  // 5. Impact & Affirmative Focus (15% weight)
  if (isSocialImpact && investor.impactFocus && investor.impactFocus.length > 0) {
    score += 15;
    whyMatched.push(`Impact Alignment: Prioritizes ${investor.impactFocus.slice(0, 2).join(' & ')}`);
  } else if (isSocialImpact) {
    score += 10;
  } else {
    score += 8;
  }

  // 6. Mentorship & Value Add (10% weight)
  if (investor.mentorshipAvailable && investor.marketAccessAvailable) {
    score += 10;
    whyMatched.push(`Strategic Fit: Provides active mentorship and verified commercial market linkage`);
  } else if (investor.mentorshipAvailable) {
    score += 7;
    whyMatched.push(`Mentorship Fit: Veteran founder mentoring network included`);
  } else {
    score += 5;
  }

  // Normalize final score between 48% and 96%
  const finalScore = Math.min(96, Math.max(48, Math.round(score)));

  // If no gap was identified, provide standard verification advisory
  if (!potentialGap) {
    potentialGap = 'Active deal window and cohort intake timeline must be verified on the official portal.';
  }

  return {
    score: finalScore,
    whyMatched,
    potentialGap
  };
}
