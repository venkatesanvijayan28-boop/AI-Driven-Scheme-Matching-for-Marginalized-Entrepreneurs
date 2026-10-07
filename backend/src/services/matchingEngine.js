/**
 * Authoritative Deterministic Scheme Matching & XAI Engine for SchemeMatch AI (SIH26092)
 * Normalized 100-Point 5-Factor Weighted Compatibility Model:
 * - Sector Compatibility: 30%
 * - Affirmative Quota & Category: 25%
 * - Capital / Project Cost Range: 20%
 * - Location & Geography: 15%
 * - Age & Demographics: 10%
 *
 * Separates Legal Eligibility Status from Compatibility Match Score.
 */

/**
 * Evaluate single scheme against entrepreneur profile
 * @param {object} scheme - Scheme data object
 * @param {object} profile - Entrepreneur persona profile
 * @returns {object} Structured evaluation containing score, eligibilityStatus, factorScores, rules, and XAI
 */
export function evaluateSchemeCompatibility(scheme, profile = {}) {
  const matchedRules = [];
  const failedRules = [];
  const missingRequirements = [];
  const reasons = [];

  const sector = (profile?.sector || '').trim().toLowerCase();
  const category = (profile?.socialCategory || '').trim().toUpperCase();
  const gender = (profile?.gender || '').trim().toLowerCase();
  const location = (profile?.locationType || profile?.location || '').trim().toLowerCase();
  const state = (profile?.state || '').trim().toLowerCase();
  const age = Number(profile?.age || 0);

  // Parse funding requirement
  let fundingNum = 0;
  const rawFunding = profile?.fundingRequiredNum || profile?.fundingRequired || 500000;
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
  const schemeName = scheme?.shortName || scheme?.name || 'Scheme';
  const minFunding = Number(scheme?.minFundingNum || 0);
  const maxFunding = Number(scheme?.maxFundingNum || 100000000);

  let isDisqualified = false;
  let hasPendingPrerequisites = false;

  // =========================================================================
  // 1. AGE FACTOR (10% Weight) - Hard Gate: Age >= 18
  // =========================================================================
  let ageScore = 100;
  if (age > 0) {
    if (age < 18) {
      ageScore = 0;
      isDisqualified = true;
      failedRules.push('Applicant is below statutory minimum age requirement of 18 years');
    } else if (age >= 18 && age <= 65) {
      ageScore = 100;
      matchedRules.push(`Applicant age (${age} yrs) satisfies statutory adult entrepreneur criteria (18-65)`);
    } else {
      ageScore = 70;
      matchedRules.push(`Applicant age (${age} yrs) is above optimal 65 band, requiring co-applicant guarantor`);
      missingRequirements.push('Co-applicant / legal successor agreement');
    }
  } else {
    // Missing age
    ageScore = 50;
    missingRequirements.push('Proof of Age (Birth Certificate / Aadhaar DOB) required to verify eligibility');
  }

  // =========================================================================
  // 2. SECTOR COMPATIBILITY (30% Weight)
  // =========================================================================
  let sectorScore = 50;
  const schemeSectors = (scheme?.sectorsList || []).map(s => s.toLowerCase());
  const schemeSectorText = (scheme?.sector || '').toLowerCase();

  const isExactSectorMatch = schemeSectors.some(s => s.includes(sector) || sector.includes(s));
  const isTextMatch = schemeSectorText.includes(sector);

  const sectorWords = sector.toLowerCase().split(/[\s,&/]+/).filter(w => w.length >= 4);
  const isKeywordMatch = sectorWords.length > 0 && sectorWords.some(w => schemeSectorText.includes(w) || schemeSectors.some(s => s.includes(w)));

  // Scheme specific sector requirements
  if (schemeId.includes('pmfme')) {
    if (sector.includes('food') || sector.includes('agro') || sector.includes('spice') || sector.includes('dairy') || sector.includes('bakery')) {
      sectorScore = 100;
      matchedRules.push('Enterprise sector matches PMFME micro food processing mandate');
      reasons.push('Eligible for 35% credit-linked capital subsidy up to ₹10 Lakh for food processing');
    } else {
      sectorScore = 10;
      isDisqualified = true;
      failedRules.push('PMFME is strictly restricted to food processing & agro-value addition units');
    }
  } else if (schemeId.includes('vishwakarma')) {
    if (sector.includes('handloom') || sector.includes('artisan') || sector.includes('craft') || sector.includes('textile') || sector.includes('carpentry') || sector.includes('pottery') || sector.includes('blacksmith')) {
      sectorScore = 100;
      matchedRules.push('Traditional artisan/craft sector matches PM Vishwakarma recognized trades');
      reasons.push('Eligible for ₹15,000 modern toolkit voucher + 5% collateral-free credit');
    } else {
      sectorScore = 20;
      failedRules.push('PM Vishwakarma is reserved for 18 traditional artisan and craft trades');
    }
  } else if (schemeId.includes('cgss') || schemeId.includes('startup-seed') || schemeId.includes('jiogennext')) {
    if (sector.includes('tech') || sector.includes('software') || sector.includes('agritech') || sector.includes('deeptech') || (profile?.stage || '').toLowerCase().includes('startup')) {
      sectorScore = 100;
      matchedRules.push('Innovative technology/startup focus matches incubator and guarantee eligibility');
    } else {
      sectorScore = 40;
      missingRequirements.push('DPIIT Startup India Recognition Certificate');
    }
  } else if (isExactSectorMatch || isTextMatch || isKeywordMatch) {
    sectorScore = 100;
    matchedRules.push(`Sector '${profile?.sector}' is explicitly covered under ${schemeName}`);
    reasons.push(`Direct sector alignment with ${schemeName} guidelines`);
  } else if (schemeSectors.some(s => s.includes('all') || s.includes('manufacturing') || s.includes('services'))) {
    sectorScore = 80;
    matchedRules.push(`Sector broadly falls under general MSME activities`);
  } else {
    sectorScore = 30;
    failedRules.push(`Sector '${profile?.sector}' is not a primary target sector for this scheme`);
  }

  // =========================================================================
  // 3. AFFIRMATIVE ACTION & QUOTA (25% Weight)
  // =========================================================================
  let quotaScore = 75; // Standard general category baseline
  const isSCST = category.includes('SC') || category.includes('ST');
  const isOBC = category.includes('OBC');
  const isWoman = gender === 'female' || gender === 'woman';
  const isSpecialCat = isSCST || isOBC || isWoman || category.includes('MINORITY');

  if (schemeId.includes('standup') || schemeId.includes('stand-up')) {
    // Hard gate: Stand-Up India requires Woman OR SC/ST
    if (isWoman || isSCST) {
      quotaScore = 100;
      matchedRules.push(`Applicant satisfies statutory Stand-Up India reservation: ${isWoman ? 'Women Entrepreneur' : 'SC/ST Entrepreneur'}`);
      reasons.push('Collateral-free greenfield enterprise composite loan from ₹10 Lakh to ₹1 Crore');
    } else {
      quotaScore = 0;
      isDisqualified = true;
      failedRules.push('Stand-Up India is strictly reserved for SC, ST, or Women entrepreneurs');
    }
  } else if (schemeId.includes('nssh') || schemeId.includes('sc-st-hub')) {
    // Hard gate: NSSH requires SC or ST
    if (isSCST) {
      quotaScore = 100;
      matchedRules.push('Applicant category verified for National SC-ST Hub special intervention');
      reasons.push('25% Special Capital Subsidy on plant and machinery up to ₹25 Lakh');
    } else {
      quotaScore = 0;
      isDisqualified = true;
      failedRules.push('National SC-ST Hub (NSSH) benefits are exclusively for SC and ST entrepreneurs');
    }
  } else if (schemeId.includes('reliance-foundation-women') || schemeId.includes('swayamshree')) {
    // Women exclusive
    if (isWoman) {
      quotaScore = 100;
      matchedRules.push('Applicant satisfies Women Entrepreneurship mandate');
    } else {
      quotaScore = 0;
      isDisqualified = true;
      failedRules.push('This program is exclusively designed for Women-led community enterprises');
    }
  } else if (schemeId.includes('pmegp')) {
    if (isSpecialCat) {
      quotaScore = 100;
      matchedRules.push(`Special Category status (${category || (isWoman ? 'Women' : '')}) grants maximum 35% capital subsidy and only 5% own contribution`);
      reasons.push('Highest subsidy bracket (up to 35%) and reduced 5% margin money');
    } else {
      quotaScore = 75;
      matchedRules.push('General Category applicant eligible for standard 15-25% subsidy with 10% own contribution');
    }
  } else {
    if (isSpecialCat) {
      quotaScore = 95;
      matchedRules.push('Affirmative action quota priority applies under MSME guidelines');
    } else {
      quotaScore = 75;
    }
  }

  // =========================================================================
  // 4. CAPITAL / PROJECT COST FEASIBILITY (20% Weight)
  // =========================================================================
  let capitalScore = 80;

  if (fundingNum > 0) {
    if (fundingNum > maxFunding * 2) {
      // Exceeds double the scheme limit - hard disqualification
      capitalScore = 0;
      isDisqualified = true;
      failedRules.push(`Project cost (₹${(fundingNum / 100000).toFixed(1)}L) severely exceeds maximum statutory ceiling (₹${(maxFunding / 100000).toFixed(1)}L)`);
    } else if (fundingNum > maxFunding) {
      // Exceeds limit slightly
      capitalScore = 40;
      failedRules.push(`Project cost (₹${(fundingNum / 100000).toFixed(1)}L) exceeds scheme ceiling (₹${(maxFunding / 100000).toFixed(1)}L), requires downsizing or multiple co-financiers`);
      missingRequirements.push(`Project cost rationalization below ₹${(maxFunding / 100000).toFixed(1)}L`);
    } else if (fundingNum < minFunding) {
      capitalScore = 50;
      failedRules.push(`Project cost (₹${fundingNum}) is below minimum qualifying threshold of ₹${minFunding}`);
    } else {
      // Ideal range
      capitalScore = 100;
      matchedRules.push(`Project cost ₹${(fundingNum / 100000).toFixed(1)}L falls comfortably within permissible limits (₹${(minFunding / 100000).toFixed(1)}L - ₹${(maxFunding / 100000).toFixed(1)}L)`);
      reasons.push(`Target capital expenditure fits the sanction budget of ${schemeName}`);
    }
  } else {
    capitalScore = 60;
  }

  // =========================================================================
  // 5. LOCATION & GEOGRAPHY (15% Weight)
  // =========================================================================
  let locationScore = 80;
  const isRural = location.includes('rural') || location.includes('village') || location.includes('panchayat');

  // State specific schemes
  if (schemeId.includes('swayamshree')) {
    const eligibleStates = ['madhya pradesh', 'gujarat', 'odisha'];
    const isStateMatch = eligibleStates.some(st => state.includes(st) || location.includes(st));
    if (isStateMatch) {
      locationScore = 100;
      matchedRules.push(`Applicant state (${profile?.state}) is an approved cluster territory for Swayamshree`);
    } else {
      locationScore = 0;
      isDisqualified = true;
      failedRules.push(`Swayamshree is currently operational only in MP, Gujarat, and Odisha`);
    }
  } else if (schemeId.includes('pmegp')) {
    if (isRural) {
      locationScore = 100;
      matchedRules.push('Rural location qualifies for the maximum 35% capital subsidy tier');
      reasons.push('Village Panchayat Rural Area certification unlocks maximum incentive band');
    } else {
      locationScore = 80;
      matchedRules.push('Urban location receives standard 15-25% capital subsidy tier');
    }
  } else if (schemeId.includes('svanidhi')) {
    if (!isRural) {
      locationScore = 100;
      matchedRules.push('Urban location aligns with street vending micro-credit corridor');
    } else {
      locationScore = 75;
      matchedRules.push('Peri-urban vendor eligible under extended Municipal jurisdiction');
    }
  } else {
    locationScore = 90;
    matchedRules.push(`All-India jurisdiction applicable for ${schemeName}`);
  }

  // =========================================================================
  // FINAL NORMALIZED COMPATIBILITY SCORE (0 - 100)
  // Formula: (Sector * 0.30) + (Quota * 0.25) + (Capital * 0.20) + (Location * 0.15) + (Age * 0.10)
  // =========================================================================
  const weightedScore = Math.round(
    (sectorScore * 0.30) +
    (quotaScore * 0.25) +
    (capitalScore * 0.20) +
    (locationScore * 0.15) +
    (ageScore * 0.10)
  );

  const matchScore = Math.min(100, Math.max(0, weightedScore));

  // Determine Statutory Eligibility Status
  let eligibilityStatus = 'eligible';
  if (isDisqualified || failedRules.length > 0) {
    eligibilityStatus = 'not_eligible';
  } else if (missingRequirements.length > 0 || capitalScore < 70) {
    eligibilityStatus = 'conditionally_eligible';
  }

  // Status badge label
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
    schemeId: scheme.id,
    schemeName: scheme.name,
    shortName: scheme.shortName,
    matchScore,
    matchPercentage: matchScore,
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

/**
 * Rank a list of schemes for an entrepreneur profile
 * @param {Array} schemes - List of scheme objects
 * @param {object} profile - Entrepreneur persona profile
 * @returns {Array} Evaluated schemes sorted by compatibility score (eligible first)
 */
export function rankSchemesForProfile(schemes = [], profile = {}) {
  return schemes.map(scheme => {
    const evaluation = evaluateSchemeCompatibility(scheme, profile);
    return {
      ...scheme,
      matchScore: evaluation.matchScore,
      eligibilityStatus: evaluation.eligibilityStatus,
      status: evaluation.status,
      factorScores: evaluation.factorScores,
      matchedRules: evaluation.matchedRules,
      failedRules: evaluation.failedRules,
      missingRequirements: evaluation.missingRequirements,
      whyMatchedReasons: evaluation.whyMatchedReasons
    };
  }).sort((a, b) => {
    // Eligible & conditionally eligible schemes rank ahead of completely ineligible schemes
    if (a.eligibilityStatus !== 'not_eligible' && b.eligibilityStatus === 'not_eligible') return -1;
    if (a.eligibilityStatus === 'not_eligible' && b.eligibilityStatus !== 'not_eligible') return 1;
    return b.matchScore - a.matchScore;
  });
}
