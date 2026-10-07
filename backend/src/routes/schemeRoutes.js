import { Router } from 'express';
import { 
  getAllSchemes, 
  getSchemeById, 
  createScheme, 
  updateScheme, 
  deleteScheme, 
  getMatchedSchemes, 
  getWhyMatched,
  getSchemeFinancials
} from '../controllers/schemeController.js';
import { requireAuth, requireAdmin } from '../middleware/authMiddleware.js';

const router = Router();

// Public / User Endpoints
router.get('/', getAllSchemes);
router.post('/match', getMatchedSchemes);
router.get('/match', getMatchedSchemes);
router.post('/calculate-financials', getSchemeFinancials);
router.get('/:id', getSchemeById);
router.get('/:id/why-matched', getWhyMatched);

// Admin-Protected Scheme Modification Endpoints
router.post('/', requireAuth, requireAdmin, createScheme);
router.put('/:id', requireAuth, requireAdmin, updateScheme);
router.delete('/:id', requireAuth, requireAdmin, deleteScheme);

export default router;
