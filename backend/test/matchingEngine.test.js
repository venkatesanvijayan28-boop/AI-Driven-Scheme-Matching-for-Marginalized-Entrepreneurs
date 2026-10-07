import { describe, it } from 'node:test';
import assert from 'node:assert';
import { evaluateSchemeCompatibility, rankSchemesForProfile } from '../src/services/matchingEngine.js';

describe('Authoritative Matching Engine Unit Tests', () => {
  const pmegpScheme = {
    id: 'pmegp',
    name: 'Prime Minister’s Employment Generation Programme (PMEGP)',
    shortName: 'PMEGP',
    sector: 'Manufacturing, Food Processing, Services',
    sectorsList: ['Food Processing', 'Manufacturing', 'Services'],
    minFundingNum: 100000,
    maxFundingNum: 5000000,
    subsidyRate: '35% Rural, 25% Urban',
    marginMoney: '5% for SC/ST/OBC/Women'
  };

  const standUpIndiaScheme = {
    id: 'standup-india',
    name: 'Stand-Up India Scheme for Women & SC/ST',
    shortName: 'Stand-Up India',
    sector: 'All greenfield MSME sectors',
    sectorsList: ['Manufacturing', 'Services', 'Trading', 'Agri'],
    minFundingNum: 1000000,
    maxFundingNum: 10000000,
    subsidyRate: 'Composite Bank Loan',
    marginMoney: '10%'
  };

  it('calculates normalized 100-point 5-factor score correctly for optimal applicant', () => {
    const profile = {
      sector: 'Food Processing',
      socialCategory: 'OBC',
      gender: 'male',
      locationType: 'rural',
      fundingRequiredNum: 500000,
      age: 28
    };

    const result = evaluateSchemeCompatibility(pmegpScheme, profile);

    assert.strictEqual(result.factorScores.sector, 100);
    assert.strictEqual(result.factorScores.quota, 100);
    assert.strictEqual(result.factorScores.capital, 100);
    assert.strictEqual(result.factorScores.location, 100);
    assert.strictEqual(result.factorScores.age, 100);

    // 100*0.30 + 100*0.25 + 100*0.20 + 100*0.15 + 100*0.10 = 100
    assert.strictEqual(result.matchScore, 100);
    assert.strictEqual(result.eligibilityStatus, 'eligible');
  });

  it('enforces statutory hard gate: disqualifies applicant under 18 years', () => {
    const minorProfile = {
      sector: 'Food Processing',
      socialCategory: 'OBC',
      gender: 'male',
      locationType: 'rural',
      fundingRequiredNum: 200000,
      age: 16 // Minor
    };

    const result = evaluateSchemeCompatibility(pmegpScheme, minorProfile);

    assert.strictEqual(result.factorScores.age, 0);
    assert.strictEqual(result.eligibilityStatus, 'not_eligible');
    assert.ok(result.failedRules.some(r => r.includes('below statutory minimum age')));
  });

  it('enforces targeted quota hard gate: Stand-Up India rejects General Male', () => {
    const generalMaleProfile = {
      sector: 'Manufacturing',
      socialCategory: 'General',
      gender: 'male',
      locationType: 'urban',
      fundingRequiredNum: 1500000,
      age: 30
    };

    const result = evaluateSchemeCompatibility(standUpIndiaScheme, generalMaleProfile);

    assert.strictEqual(result.factorScores.quota, 0);
    assert.strictEqual(result.eligibilityStatus, 'not_eligible');
    assert.ok(result.failedRules.some(r => r.includes('Stand-Up India is strictly reserved')));
  });

  it('accepts Female General applicant for Stand-Up India', () => {
    const femaleGeneralProfile = {
      sector: 'Manufacturing',
      socialCategory: 'General',
      gender: 'female',
      locationType: 'urban',
      fundingRequiredNum: 1500000,
      age: 32
    };

    const result = evaluateSchemeCompatibility(standUpIndiaScheme, femaleGeneralProfile);

    assert.strictEqual(result.factorScores.quota, 100);
    assert.strictEqual(result.eligibilityStatus, 'eligible');
  });

  it('disqualifies project cost severely exceeding scheme maximum funding', () => {
    const excessiveFundingProfile = {
      sector: 'Food Processing',
      socialCategory: 'OBC',
      gender: 'male',
      locationType: 'rural',
      fundingRequiredNum: 15000000, // 1.5 Cr (3x PMEGP limit of 50L)
      age: 28
    };

    const result = evaluateSchemeCompatibility(pmegpScheme, excessiveFundingProfile);

    assert.strictEqual(result.factorScores.capital, 0);
    assert.strictEqual(result.eligibilityStatus, 'not_eligible');
    assert.ok(result.failedRules.some(r => r.includes('severely exceeds maximum statutory ceiling')));
  });

  it('ranks eligible schemes above disqualified schemes', () => {
    const profile = {
      sector: 'Manufacturing',
      socialCategory: 'General',
      gender: 'male',
      locationType: 'urban',
      fundingRequiredNum: 2000000,
      age: 30
    };

    const ranked = rankSchemesForProfile([standUpIndiaScheme, pmegpScheme], profile);

    // PMEGP is eligible for general male, Stand-Up India is not
    assert.strictEqual(ranked[0].id, 'pmegp');
    assert.strictEqual(ranked[0].eligibilityStatus, 'eligible');
    assert.strictEqual(ranked[1].id, 'standup-india');
    assert.strictEqual(ranked[1].eligibilityStatus, 'not_eligible');
  });
});
