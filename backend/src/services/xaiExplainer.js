/**
 * Explainable AI (XAI) Justification Generator for SchemeMatch AI (SIH26092)
 * Generates transparent, deterministic reasonings, matched/failed rules,
 * and missing prerequisites directly from the authoritative matching engine.
 */

import { evaluateSchemeCompatibility } from './matchingEngine.js';

/**
 * Generate comprehensive XAI explanation for a scheme and entrepreneur profile
 * @param {object} scheme - Scheme data object
 * @param {object} profile - Entrepreneur persona profile
 * @returns {object} Structured XAI payload
 */
export function generateXaiExplanation(scheme, profile = {}) {
  const evaluation = evaluateSchemeCompatibility(scheme, profile);

  const factorScores = {
    sector: evaluation.factorScores.sector,
    quota: evaluation.factorScores.quota,
    capital: evaluation.factorScores.capital,
    location: evaluation.factorScores.location,
    age: evaluation.factorScores.age,
    // UI compatibility keys
    sectorMatch: evaluation.factorScores.sector,
    categoryMatch: evaluation.factorScores.quota,
    fundingMatch: evaluation.factorScores.capital,
    locationMatch: evaluation.factorScores.location,
    ageMatch: evaluation.factorScores.age,
    incomeMatch: evaluation.factorScores.quota,
    stageMatch: evaluation.factorScores.sector
  };

  // Build human-readable synthesis
  const applicantName = profile?.name || 'Entrepreneur';
  const schemeName = scheme?.shortName || scheme?.name || 'Government Scheme';

  let summary = '';
  if (evaluation.eligibilityStatus === 'not_eligible') {
    summary = `${applicantName} is currently ineligible for ${schemeName} due to statutory disqualification: ${evaluation.failedRules.join('; ')}.`;
  } else if (evaluation.eligibilityStatus === 'conditionally_eligible') {
    summary = `${applicantName} demonstrates strong compatibility (${evaluation.matchScore}%) with ${schemeName}, subject to submitting required documentation: ${evaluation.missingRequirements.join(', ')}.`;
  } else {
    summary = `${applicantName} is fully eligible for ${schemeName} with a ${evaluation.matchScore}% affirmative match score based on sector, category, and location alignment.`;
  }

  return {
    schemeId: scheme.id,
    schemeName: scheme.name,
    shortName: scheme.shortName,
    eligibilityStatus: evaluation.eligibilityStatus,
    matchScore: evaluation.matchScore,
    status: evaluation.status,
    factorScores,
    matchedRules: evaluation.matchedRules,
    failedRules: evaluation.failedRules,
    missingRequirements: evaluation.missingRequirements,
    whyMatchedReasons: evaluation.whyMatchedReasons,
    summary,
    evaluatedAt: new Date().toISOString()
  };
}
