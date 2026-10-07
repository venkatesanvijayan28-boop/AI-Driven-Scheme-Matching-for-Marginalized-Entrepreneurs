import { db } from '../config/db.js';
import { rankSchemesForProfile, evaluateSchemeCompatibility } from '../services/matchingEngine.js';
import { generateXaiExplanation } from '../services/xaiExplainer.js';
import { calculateSchemeFinancials } from '../services/financialCalculator.js';

/**
 * GET /api/schemes - Fetch all schemes from authoritative database
 */
export async function getAllSchemes(req, res) {
  try {
    const { sector, maxFunding } = req.query;
    let schemes = await db.getAllSchemes();

    if (sector && sector !== 'all') {
      schemes = schemes.filter(s => s.sectorsList?.some(sec => sec.toLowerCase().includes(sector.toLowerCase())));
    }
    if (maxFunding) {
      const max = Number(maxFunding);
      schemes = schemes.filter(s => s.minFundingNum <= max);
    }

    return res.status(200).json({ success: true, count: schemes.length, data: schemes });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * GET /api/schemes/:id - Fetch single scheme by ID
 */
export async function getSchemeById(req, res) {
  try {
    const { id } = req.params;
    const scheme = await db.getSchemeById(id);
    if (!scheme) {
      return res.status(404).json({ success: false, error: 'Scheme not found' });
    }
    return res.status(200).json({ success: true, data: scheme });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * POST /api/schemes - Create new government scheme (Admin only)
 */
export async function createScheme(req, res) {
  try {
    const schemeData = req.body;
    if (!schemeData.name || !schemeData.department) {
      return res.status(400).json({ success: false, error: 'Scheme name and department are required' });
    }

    const created = await db.createScheme(schemeData);
    return res.status(201).json({
      success: true,
      message: 'Scheme successfully created and persisted to database',
      data: created
    });
  } catch (error) {
    console.error('Error creating scheme:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * PUT /api/schemes/:id - Update existing scheme (Admin only)
 */
export async function updateScheme(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await db.updateScheme(id, updateData);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Scheme not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Scheme updated and persisted in database',
      data: updated
    });
  } catch (error) {
    console.error('Error updating scheme:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * DELETE /api/schemes/:id - Delete scheme (Admin only)
 */
export async function deleteScheme(req, res) {
  try {
    const { id } = req.params;
    const deleted = await db.deleteScheme(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Scheme not found or already deleted' });
    }

    return res.status(200).json({
      success: true,
      message: 'Scheme deleted successfully from database'
    });
  } catch (error) {
    console.error('Error deleting scheme:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * POST & GET /api/schemes/match - Authoritative matching calculation
 */
export async function getMatchedSchemes(req, res) {
  try {
    const { profileId } = req.query;
    let profile = req.body && Object.keys(req.body).length > 0 ? req.body : null;

    if (profileId) {
      const dbProfile = await db.getProfileById(profileId);
      if (dbProfile) {
        profile = { ...dbProfile, ...(profile || {}) };
      }
    }

    if (!profile) {
      profile = await db.getProfileById('ravi');
    }

    const allSchemes = await db.getAllSchemes();
    const rankedSchemes = rankSchemesForProfile(allSchemes, profile);

    return res.status(200).json({
      success: true,
      profileEvaluated: {
        id: profile.id,
        name: profile.name,
        category: profile.socialCategory,
        sector: profile.sector,
        age: profile.age,
        location: profile.locationType || profile.location
      },
      count: rankedSchemes.length,
      data: rankedSchemes
    });
  } catch (error) {
    console.error('Match schemes error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * GET /api/schemes/:id/why-matched - Generate real deterministic XAI breakdown
 */
export async function getWhyMatched(req, res) {
  try {
    const { id } = req.params;
    const { profileId = 'ravi' } = req.query;

    const scheme = await db.getSchemeById(id);
    if (!scheme) {
      return res.status(404).json({ success: false, error: 'Scheme not found' });
    }

    let profile = await db.getProfileById(profileId);
    if (!profile) {
      profile = await db.getProfileById('ravi');
    }

    const xaiData = generateXaiExplanation(scheme, profile);

    return res.status(200).json({
      success: true,
      data: xaiData
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * POST /api/schemes/calculate-financials - Dynamic subsidy, loan, and margin calculation
 */
export async function getSchemeFinancials(req, res) {
  try {
    const { schemeId, projectCost, profile } = req.body;
    let scheme = null;
    if (schemeId) {
      scheme = await db.getSchemeById(schemeId);
    }
    if (!scheme) {
      scheme = (await db.getAllSchemes())[0];
    }

    const financialBreakdown = calculateSchemeFinancials(scheme, profile || {}, projectCost);

    return res.status(200).json({
      success: true,
      schemeId: scheme.id,
      schemeName: scheme.shortName || scheme.name,
      data: financialBreakdown
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
