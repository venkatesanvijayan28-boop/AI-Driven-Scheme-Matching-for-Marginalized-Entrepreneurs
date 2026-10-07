import { Router } from 'express';
import { getNearbyBanks, getNearbyCSCs, getAllCenters } from '../controllers/centerController.js';

const router = Router();

router.get('/', getAllCenters);
router.get('/banks', getNearbyBanks);
router.get('/csc', getNearbyCSCs);

export default router;
