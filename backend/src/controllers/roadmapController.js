import { db } from '../config/db.js';

/**
 * GET /api/roadmap/user/:userId - Retrieve user roadmap applications
 */
export async function getUserApplications(req, res) {
  try {
    const { userId = 'ravi' } = req.params;
    const apps = await db.getUserApplications(userId);
    return res.status(200).json({ success: true, count: apps.length, data: apps });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * GET /api/roadmap/:id - Retrieve specific application details
 */
export async function getApplicationDetails(req, res) {
  try {
    const { id } = req.params;
    const app = await db.getApplicationById(id);
    if (!app) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    return res.status(200).json({ success: true, data: app });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * POST /api/roadmap/apply - Initiate new scheme roadmap application
 */
export async function createApplication(req, res) {
  try {
    const { schemeId } = req.body;
    const authenticatedUserId = req.user?.profileId || req.user?.id || req.body.userId || 'ravi';

    if (!schemeId) {
      return res.status(400).json({ success: false, error: 'Scheme ID is required' });
    }

    // Check if scheme exists
    const scheme = await db.getSchemeById(schemeId);
    if (!scheme) {
      return res.status(404).json({ success: false, error: `Scheme '${schemeId}' does not exist` });
    }

    // Check if already applied
    const existingApps = await db.getUserApplications(authenticatedUserId);
    const existing = existingApps.find(a => a.schemeId === schemeId);
    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'Existing application resumed',
        data: existing
      });
    }

    const newApp = await db.createApplication(authenticatedUserId, schemeId);
    return res.status(201).json({
      success: true,
      message: 'Application initiated successfully and persisted in database',
      data: newApp
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * PUT /api/roadmap/:id/stage - Secure stage advancement with sequential & prerequisite checks
 */
export async function updateApplicationStage(req, res) {
  try {
    const { id } = req.params;
    const { stepNumber, status = 'completed', documentReadyCount } = req.body;

    const step = Number(stepNumber);
    if (isNaN(step) || step < 1 || step > 7) {
      return res.status(400).json({
        success: false,
        error: 'Invalid stage index. Roadmap stages must be between 1 and 7.'
      });
    }

    const app = await db.getApplicationById(id);
    if (!app) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }

    // 1. Authenticated User Ownership Check
    const authUserId = req.user?.profileId || req.user?.id;
    const isAdmin = req.user?.role === 'admin';
    if (!isAdmin && authUserId && app.userId && authUserId !== app.userId) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden: You do not have permission to advance another user’s application.'
      });
    }

    // 2. Sequential Progression Check: cannot complete stage N if stage N-1 is not completed
    if (step > 1 && status === 'completed') {
      const prevStage = app.stages.find(s => s.step === step - 1);
      if (!prevStage || prevStage.status !== 'completed') {
        return res.status(400).json({
          success: false,
          error: `Sequential constraint violated: Stage ${step - 1} (${prevStage?.title || 'Previous Stage'}) must be completed before advancing to Stage ${step}.`
        });
      }
    }

    // 3. Document Prerequisite Check for Stage 3 (Document Readiness)
    if (step === 3 && status === 'completed') {
      if (documentReadyCount !== undefined && Number(documentReadyCount) < 4) {
        return res.status(400).json({
          success: false,
          error: 'Document prerequisite incomplete: All 4 mandatory KYC documents (Aadhaar, Caste/Income, Passbook, Address Proof) must be uploaded before completing Stage 3.'
        });
      }
    }

    const updated = await db.updateApplicationStage(id, step, status);

    return res.status(200).json({
      success: true,
      message: `Stage ${step} successfully advanced to ${status} with server validation`,
      data: updated
    });
  } catch (error) {
    console.error('Roadmap stage update error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
