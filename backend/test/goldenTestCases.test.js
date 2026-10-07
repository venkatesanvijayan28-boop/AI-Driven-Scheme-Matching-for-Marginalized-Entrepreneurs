import { describe, it } from 'node:test';
import assert from 'node:assert';
import { evaluateSchemeCompatibility } from '../src/services/matchingEngine.js';
import { SCHEMES_DATABASE } from '../src/data/schemes.js';

describe('Phase 12: Golden Validation Test Cases (TC01 - TC08)', () => {
  const getScheme = (id) => SCHEMES_DATABASE.find(s => s.id === id);

  it('TC01: 28 / OBC / Rural / Food Processing / ₹5L -> Optimal PMEGP & PMFME match', () => {
    const profile = {
      age: 28,
      socialCategory: 'OBC',
      locationType: 'rural',
      sector: 'Food Processing',
      fundingRequiredNum: 500000
    };

    const pmegp = evaluateSchemeCompatibility(getScheme('pmegp'), profile);
    assert.strictEqual(pmegp.eligibilityStatus, 'eligible');
    assert.strictEqual(pmegp.matchScore, 100);
    assert.ok(pmegp.whyMatchedReasons.some(r => r.includes('35%') || r.includes('subsidy')));

    const pmfme = evaluateSchemeCompatibility(getScheme('pmfme-scheme'), profile);
    assert.strictEqual(pmfme.eligibilityStatus, 'eligible');
    assert.ok(pmfme.matchScore >= 90);
  });

  it('TC02: 32 / SC / Female / Urban / Textiles / ₹15L -> Stand-Up India & NSSH highly eligible', () => {
    const profile = {
      age: 32,
      socialCategory: 'SC',
      gender: 'female',
      locationType: 'urban',
      sector: 'Textiles & Handloom',
      fundingRequiredNum: 1500000
    };

    const standup = evaluateSchemeCompatibility(getScheme('standup-india'), profile);
    assert.strictEqual(standup.eligibilityStatus, 'eligible');
    assert.strictEqual(standup.factorScores.quota, 100);

    const nssh = evaluateSchemeCompatibility(getScheme('nssh-sc-st-hub'), profile);
    assert.strictEqual(nssh.eligibilityStatus, 'eligible');
    assert.strictEqual(nssh.factorScores.quota, 100);
  });

  it('TC03: 25 / General / Urban / Software / ₹10L -> CGSS / Startup eligible, Stand-Up India ineligible', () => {
    const profile = {
      age: 25,
      socialCategory: 'General',
      gender: 'male',
      locationType: 'urban',
      sector: 'Software & Technology',
      fundingRequiredNum: 1000000
    };

    const cgss = evaluateSchemeCompatibility(getScheme('cgss-startup-guarantee'), profile);
    assert.strictEqual(cgss.eligibilityStatus, 'eligible');
    assert.strictEqual(cgss.factorScores.sector, 100);

    const standup = evaluateSchemeCompatibility(getScheme('standup-india'), profile);
    assert.strictEqual(standup.eligibilityStatus, 'not_eligible');
    assert.strictEqual(standup.factorScores.quota, 0);
  });

  it('TC04: 16 / General / Rural / Agro / ₹2L -> Minor statutory hard disqualification (Age < 18)', () => {
    const profile = {
      age: 16,
      socialCategory: 'General',
      gender: 'male',
      locationType: 'rural',
      sector: 'Agriculture',
      fundingRequiredNum: 200000
    };

    const pmegp = evaluateSchemeCompatibility(getScheme('pmegp'), profile);
    assert.strictEqual(pmegp.eligibilityStatus, 'not_eligible');
    assert.strictEqual(pmegp.factorScores.age, 0);
    assert.ok(pmegp.failedRules.some(r => r.includes('below statutory minimum age')));
  });

  it('TC05: 45 / General / Urban / Trading / ₹80L -> Micro-vendor scheme ceilings exceeded', () => {
    const profile = {
      age: 45,
      socialCategory: 'General',
      gender: 'male',
      locationType: 'urban',
      sector: 'Trading & Retail',
      fundingRequiredNum: 8000000 // 80 Lakhs
    };

    const svanidhi = evaluateSchemeCompatibility(getScheme('pm-svanidhi'), profile);
    assert.strictEqual(svanidhi.eligibilityStatus, 'not_eligible'); // Max is 50k

    const pmegp = evaluateSchemeCompatibility(getScheme('pmegp'), profile);
    assert.strictEqual(pmegp.factorScores.capital, 40); // 80L > 50L limit
  });

  it('TC06: 40 / ST / Female / SHG / Rural / Food Processing / ₹4L -> PMFME, PMEGP, Women grants match', () => {
    const profile = {
      age: 40,
      socialCategory: 'ST',
      gender: 'female',
      locationType: 'rural',
      sector: 'Food Processing',
      fundingRequiredNum: 400000
    };

    const pmegp = evaluateSchemeCompatibility(getScheme('pmegp'), profile);
    assert.strictEqual(pmegp.eligibilityStatus, 'eligible');
    assert.strictEqual(pmegp.matchScore, 100);

    const relianceWomen = evaluateSchemeCompatibility(getScheme('reliance-foundation-women'), profile);
    assert.strictEqual(relianceWomen.eligibilityStatus, 'eligible');
    assert.strictEqual(relianceWomen.factorScores.quota, 100);
  });

  it('TC07: 50 / SC / Rural / Agriculture / ₹10L -> Agri Infra & PMEGP eligible with rural incentives', () => {
    const profile = {
      age: 50,
      socialCategory: 'SC',
      gender: 'male',
      locationType: 'rural',
      sector: 'Agriculture & Post-Harvest',
      fundingRequiredNum: 1000000
    };

    const aif = evaluateSchemeCompatibility(getScheme('agri-infra-fund'), profile);
    assert.strictEqual(aif.eligibilityStatus, 'eligible');
    assert.strictEqual(aif.factorScores.sector, 100);

    const pmegp = evaluateSchemeCompatibility(getScheme('pmegp'), profile);
    assert.strictEqual(pmegp.eligibilityStatus, 'eligible');
  });

  it('TC08: 33 / General / Urban / Software / ₹10Cr -> Exceeds standard MSME limits, matches high-guarantee startup limits', () => {
    const profile = {
      age: 33,
      socialCategory: 'General',
      gender: 'male',
      locationType: 'urban',
      sector: 'Software & Technology',
      fundingRequiredNum: 100000000 // 10 Cr
    };

    // Micro scheme like PMEGP (max 50L) must disqualify 10Cr
    const pmegp = evaluateSchemeCompatibility(getScheme('pmegp'), profile);
    assert.strictEqual(pmegp.eligibilityStatus, 'not_eligible');
    assert.strictEqual(pmegp.factorScores.capital, 0);

    // CGSS supports credit guarantee up to ₹10 Crore
    const cgss = evaluateSchemeCompatibility(getScheme('cgss-startup-guarantee'), profile);
    assert.strictEqual(cgss.factorScores.capital, 100);
    assert.strictEqual(cgss.eligibilityStatus, 'eligible');
  });
});
