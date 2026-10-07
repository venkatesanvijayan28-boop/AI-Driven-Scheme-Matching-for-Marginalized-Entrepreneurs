/**
 * Dynamic Scheme Financial Calculator Service for SchemeMatch AI (SIH26092)
 * Computes exact subsidy grant, beneficiary own contribution, and bank term loan
 * based on affirmative quota, location tier, and scheme-specific policy rules.
 */

/**
 * Calculate financial breakdown for a given scheme, profile, and project cost
 * @param {object} scheme - Scheme data object
 * @param {object} profile - Entrepreneur persona profile
 * @param {number|string} requestedProjectCost - Project cost in INR
 * @returns {object} Structured financial breakdown
 */
export function calculateSchemeFinancials(scheme, profile = {}, requestedProjectCost = null) {
  const warnings = [];

  // Parse and validate project cost
  let rawCost = requestedProjectCost;
  if (rawCost === null || rawCost === undefined || rawCost === '') {
    rawCost = profile?.fundingRequiredNum || profile?.fundingRequired || 500000;
  }

  // Handle string like "₹5.00 Lakh" or numeric
  let projectCost = 0;
  if (typeof rawCost === 'string') {
    const cleaned = rawCost.replace(/[^0-9.-]/g, '');
    const num = parseFloat(cleaned);
    if (rawCost.toLowerCase().includes('lakh') || rawCost.toLowerCase().includes('lac')) {
      projectCost = num * 100000;
    } else if (rawCost.toLowerCase().includes('cr')) {
      projectCost = num * 10000000;
    } else {
      projectCost = num || 0;
    }
  } else {
    projectCost = Number(rawCost) || 0;
  }

  // Edge Case 1: Negative project cost
  if (projectCost < 0) {
    warnings.push('Project cost cannot be negative. Value adjusted to ₹0.');
    return {
      projectCost: 0,
      subsidy: 0,
      beneficiaryContribution: 0,
      bankLoan: 0,
      subsidyPercentage: 0,
      marginPercentage: 0,
      interestRate: 0,
      tenureMonths: 0,
      monthlyEmi: 0,
      isWithinCeiling: true,
      maxAllowedFunding: scheme?.maxFundingNum || 5000000,
      warnings
    };
  }

  // Edge Case 2: Zero project cost
  if (projectCost === 0) {
    return {
      projectCost: 0,
      subsidy: 0,
      beneficiaryContribution: 0,
      bankLoan: 0,
      subsidyPercentage: 0,
      marginPercentage: 0,
      interestRate: 0,
      tenureMonths: 0,
      monthlyEmi: 0,
      isWithinCeiling: true,
      maxAllowedFunding: scheme?.maxFundingNum || 5000000,
      warnings: ['Project cost is ₹0. Please enter a valid capital expenditure requirement.']
    };
  }

  const category = (profile?.socialCategory || '').toUpperCase();
  const gender = (profile?.gender || '').toLowerCase();
  const location = (profile?.locationType || profile?.location || '').toLowerCase();
  const sector = (profile?.sector || '').toLowerCase();

  const isSpecialCategory = 
    category.includes('SC') ||
    category.includes('ST') ||
    category.includes('OBC') ||
    category.includes('MINORITY') ||
    gender === 'female' ||
    gender === 'woman' ||
    profile?.isExServiceman ||
    profile?.isDifferentlyAbled;

  const isRural = location.includes('rural') || location.includes('panchayat') || location.includes('village');

  // Determine scheme-specific parameters
  let maxCeiling = Number(scheme?.maxFundingNum) || 5000000;
  let minFunding = Number(scheme?.minFundingNum) || 10000;
  let subsidyPct = 0;
  let maxSubsidyCap = null;
  let marginPct = 10; // Default own contribution
  let interestRate = 8.5; // Base lending rate
  let tenureMonths = 84; // 7 years

  const schemeId = (scheme?.id || '').toLowerCase();

  // 1. PMEGP (Prime Minister's Employment Generation Programme)
  if (schemeId.includes('pmegp')) {
    const isService = sector.includes('service') || sector.includes('software') || sector.includes('retail');
    maxCeiling = isService ? 2000000 : 5000000; // 20L for service, 50L for manufacturing

    if (isSpecialCategory) {
      marginPct = 5; // Special category pays only 5% own contribution
      subsidyPct = isRural ? 35 : 25; // 35% Rural, 25% Urban
    } else {
      marginPct = 10; // General category pays 10% own contribution
      subsidyPct = isRural ? 25 : 15; // 25% Rural, 15% Urban
    }
    maxSubsidyCap = (maxCeiling * subsidyPct) / 100;
    interestRate = 9.0;
    tenureMonths = 84;
  }
  // 2. Stand-Up India (Women & SC/ST: ₹10L - ₹1Cr)
  else if (schemeId.includes('standup') || schemeId.includes('stand-up')) {
    minFunding = 1000000;
    maxCeiling = 10000000;
    subsidyPct = 0; // Pure composite bank loan, no direct capital subsidy
    marginPct = isSpecialCategory ? 10 : 15; // 10-15% own contribution
    interestRate = 8.0; // Concessional composite rate
    tenureMonths = 84;
  }
  // 3. PMFME (Food Processing Units)
  else if (schemeId.includes('pmfme')) {
    maxCeiling = 3000000;
    subsidyPct = 35; // 35% credit-linked capital subsidy
    maxSubsidyCap = 1000000; // Max subsidy capped at ₹10 Lakh
    marginPct = 10;
    interestRate = 8.5;
    tenureMonths = 60;
  }
  // 4. National SC-ST Hub (NSSH)
  else if (schemeId.includes('nssh') || schemeId.includes('sc-st-hub')) {
    maxCeiling = 10000000;
    subsidyPct = 25; // 25% upfront subsidy on plant & machinery
    maxSubsidyCap = 2500000; // Up to ₹25 Lakh
    marginPct = 5;
    interestRate = 8.25;
    tenureMonths = 60;
  }
  // 5. PM SVANidhi (Street Vendors)
  else if (schemeId.includes('svanidhi')) {
    minFunding = 10000;
    maxCeiling = 50000;
    subsidyPct = 7; // 7% interest subvention, not capital grant
    marginPct = 0; // 0% margin money
    interestRate = 7.0; // 7% subvention makes effective interest near zero
    tenureMonths = 12;
  }
  // 6. PM Vishwakarma (Traditional Artisans)
  else if (schemeId.includes('vishwakarma')) {
    minFunding = 15000;
    maxCeiling = 300000;
    subsidyPct = 0; // ₹15,000 toolkit voucher + 5% concessional credit
    marginPct = 5;
    interestRate = 5.0; // 5% concessional interest
    tenureMonths = 36;
  }
  // 7. MUDRA Yojana (Shishu, Kishor, Tarun)
  else if (schemeId.includes('mudra')) {
    minFunding = 50000;
    maxCeiling = 2000000;
    subsidyPct = 0; // Collateral free bank loan
    marginPct = 10;
    interestRate = 8.5;
    tenureMonths = 60;
  }
  // 8. General / Other Schemes
  else {
    maxCeiling = Number(scheme?.maxFundingNum) || 5000000;
    minFunding = Number(scheme?.minFundingNum) || 50000;
    subsidyPct = parseFloat(String(scheme?.subsidyRate || '15').replace(/[^0-9.]/g, '')) || 15;
    marginPct = parseFloat(String(scheme?.marginMoney || '10').replace(/[^0-9.]/g, '')) || 10;
    maxSubsidyCap = (maxCeiling * subsidyPct) / 100;
    interestRate = 8.75;
    tenureMonths = 60;
  }

  // Edge Case 3: Project cost exceeds scheme ceiling
  const isWithinCeiling = projectCost <= maxCeiling;
  let eligibleProjectCost = projectCost;
  if (!isWithinCeiling) {
    eligibleProjectCost = maxCeiling;
    warnings.push(`Project cost (₹${(projectCost / 100000).toFixed(2)}L) exceeds the maximum ceiling of ₹${(maxCeiling / 100000).toFixed(2)}L for ${scheme?.shortName || 'this scheme'}. Calculations capped at ₹${(maxCeiling / 100000).toFixed(2)}L.`);
  }

  // Edge Case 4: Project cost is below scheme minimum
  if (projectCost < minFunding) {
    warnings.push(`Project cost is below the scheme minimum requirement of ₹${(minFunding / 100000).toFixed(2)}L.`);
  }

  // Calculate Subsidies and Contributions
  let subsidyAmount = Math.round((eligibleProjectCost * subsidyPct) / 100);
  if (maxSubsidyCap !== null && subsidyAmount > maxSubsidyCap) {
    subsidyAmount = maxSubsidyCap;
  }

  const beneficiaryContribution = Math.round((eligibleProjectCost * marginPct) / 100);
  const bankLoan = Math.max(0, eligibleProjectCost - subsidyAmount - beneficiaryContribution);

  // EMI Calculation: P * r * (1 + r)^n / ((1 + r)^n - 1)
  let monthlyEmi = 0;
  if (bankLoan > 0 && interestRate > 0 && tenureMonths > 0) {
    const monthlyRate = (interestRate / 100) / 12;
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    monthlyEmi = Math.round((bankLoan * monthlyRate * factor) / (factor - 1));
  }

  return {
    projectCost: Math.round(projectCost),
    eligibleProjectCost: Math.round(eligibleProjectCost),
    subsidy: subsidyAmount,
    beneficiaryContribution,
    bankLoan,
    subsidyPercentage: subsidyPct,
    marginPercentage: marginPct,
    interestRate,
    tenureMonths,
    monthlyEmi,
    isWithinCeiling,
    maxAllowedFunding: maxCeiling,
    minAllowedFunding: minFunding,
    warnings
  };
}
