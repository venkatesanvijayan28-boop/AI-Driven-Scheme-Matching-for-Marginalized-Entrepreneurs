import { Router } from 'express';
import { getAllProfiles, getProfileById, updateProfile } from '../controllers/profileController.js';

const router = Router();

router.get('/', getAllProfiles);
router.get('/:id', getProfileById);
router.put('/:id', updateProfile);

export default router;
