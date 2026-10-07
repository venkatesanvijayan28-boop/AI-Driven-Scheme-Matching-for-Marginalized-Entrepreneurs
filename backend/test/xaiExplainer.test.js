import { describe, it } from 'node:test';
import assert from 'node:assert';
import { generateXaiExplanation } from '../src/services/xaiExplainer.js';

describe('Real Explainable AI (XAI) Justification Tests', () => {
  const scheme = {
    id: 'pmegp',
    name: 'Prime Minister’s Employment Generation Programme (PMEGP)',
    shortName: 'PMEGP',
    sector: 'Manufacturing & Food Processing',
    sectorsList: ['Manufacturing', 'Food Processing'],
    maxFundingNum: 5000000,
    minFundingNum: 100000,
    subsidyRate: '35% Rural',
    marginMoney: '5% for Special Categories'
  };

  it('generates structured XAI explanation with factors, rules, and missing requirements', () => {
    const profile = {
      name: 'Ravi Kumar',
      sector: 'Food Processing',
      socialCategory: 'OBC',
      gender: 'male',
      locationType: 'rural',
      fundingRequiredNum: 500000,
      age: 28
    };

    const xai = generateXaiExplanation(scheme, profile);

    assert.strictEqual(xai.schemeId, 'pmegp');
    assert.strictEqual(xai.eligibilityStatus, 'eligible');
    assert.strictEqual(xai.matchScore, 100);

    // Verify structured factors
    assert.ok(xai.factorScores.sector > 0);
    assert.ok(xai.factorScores.quota > 0);
    assert.ok(xai.factorScores.capital > 0);
    assert.ok(xai.factorScores.location > 0);
    assert.ok(xai.factorScores.age > 0);

    // Verify rules
    assert.ok(Array.isArray(xai.matchedRules));
    assert.ok(xai.matchedRules.length > 0);
    assert.ok(Array.isArray(xai.whyMatchedReasons));
    assert.ok(xai.whyMatchedReasons.length > 0);

    // Verify summary contains entrepreneur name and score
    assert.ok(xai.summary.includes('Ravi Kumar'));
    assert.ok(xai.summary.includes('100%'));
  });

  it('generates clear disqualification explanation for ineligible criteria', () => {
    const minorProfile = {
      name: 'Young Applicant',
      sector: 'Food Processing',
      socialCategory: 'General',
      gender: 'male',
      locationType: 'urban',
      fundingRequiredNum: 500000,
      age: 15
    };

    const xai = generateXaiExplanation(scheme, minorProfile);

    assert.strictEqual(xai.eligibilityStatus, 'not_eligible');
    assert.ok(xai.failedRules.length > 0);
    assert.ok(xai.summary.includes('ineligible'));
  });
});
