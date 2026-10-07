import { Router } from 'express';
import { 
  getUserApplications, 
  getApplicationDetails, 
  createApplication, 
  updateApplicationStage 
} from '../controllers/roadmapController.js';
import { requireAuth, optionalAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/user/:userId', optionalAuth, getUserApplications);
router.get('/:id', optionalAuth, getApplicationDetails);
router.post('/apply', requireAuth, createApplication);
router.put('/:id/stage', requireAuth, updateApplicationStage);

export default router;
