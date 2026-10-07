import { describe, it } from 'node:test';
import assert from 'node:assert';
import { calculateSchemeFinancials } from '../src/services/financialCalculator.js';

describe('Dynamic Financial Calculator Unit Tests', () => {
  const pmegpScheme = {
    id: 'pmegp',
    shortName: 'PMEGP',
    maxFundingNum: 5000000,
    minFundingNum: 100000,
    subsidyRate: '35% Rural, 25% Urban',
    marginMoney: '5% for Special Categories'
  };

  const pmfmeScheme = {
    id: 'pmfme-scheme',
    shortName: 'PMFME',
    maxFundingNum: 3000000,
    minFundingNum: 50000,
    subsidyRate: '35%',
    marginMoney: '10%'
  };

  it('calculates PMEGP 35% subsidy and 5% own contribution for rural OBC applicant', () => {
    const profile = {
      socialCategory: 'OBC',
      gender: 'male',
      locationType: 'rural',
      sector: 'Food Processing'
    };

    const result = calculateSchemeFinancials(pmegpScheme, profile, 500000);

    assert.strictEqual(result.projectCost, 500000);
    assert.strictEqual(result.subsidyPercentage, 35);
    assert.strictEqual(result.marginPercentage, 5);
    assert.strictEqual(result.subsidy, 175000); // 35% of 5L
    assert.strictEqual(result.beneficiaryContribution, 25000); // 5% of 5L
    assert.strictEqual(result.bankLoan, 300000); // 500000 - 175000 - 25000 = 300000
    assert.ok(result.monthlyEmi > 0);
    assert.strictEqual(result.isWithinCeiling, true);
  });

  it('caps PMFME subsidy at ₹10 Lakh maximum ceiling', () => {
    const profile = {
      socialCategory: 'General',
      gender: 'male',
      locationType: 'urban',
      sector: 'Food Processing'
    };

    // 35% of 30 Lakh = 10.5 Lakh, but max cap is 10 Lakh
    const result = calculateSchemeFinancials(pmfmeScheme, profile, 3000000);

    assert.strictEqual(result.subsidy, 1000000);
    assert.strictEqual(result.beneficiaryContribution, 300000); // 10%
    assert.strictEqual(result.bankLoan, 1700000);
  });

  it('handles negative project cost gracefully without crashing', () => {
    const profile = { socialCategory: 'General', gender: 'male', locationType: 'urban' };
    const result = calculateSchemeFinancials(pmegpScheme, profile, -50000);

    assert.strictEqual(result.projectCost, 0);
    assert.strictEqual(result.subsidy, 0);
    assert.strictEqual(result.bankLoan, 0);
    assert.ok(result.warnings.some(w => w.includes('cannot be negative')));
  });

  it('handles zero project cost gracefully', () => {
    const profile = { socialCategory: 'General', gender: 'male', locationType: 'urban' };
    const result = calculateSchemeFinancials(pmegpScheme, profile, 0);

    assert.strictEqual(result.projectCost, 0);
    assert.strictEqual(result.subsidy, 0);
    assert.strictEqual(result.bankLoan, 0);
    assert.strictEqual(result.monthlyEmi, 0);
  });

  it('caps calculations and flags warning when project cost exceeds scheme ceiling', () => {
    const profile = { socialCategory: 'General', gender: 'male', locationType: 'urban' };
    // Requesting 80 Lakhs on PMEGP (max 50 Lakhs)
    const result = calculateSchemeFinancials(pmegpScheme, profile, 8000000);

    assert.strictEqual(result.projectCost, 8000000);
    assert.strictEqual(result.eligibleProjectCost, 5000000);
    assert.strictEqual(result.isWithinCeiling, false);
    assert.ok(result.warnings.some(w => w.includes('exceeds the maximum ceiling')));
  });
});
