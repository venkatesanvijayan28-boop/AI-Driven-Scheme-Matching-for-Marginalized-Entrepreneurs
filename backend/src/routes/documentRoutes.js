import { Router } from 'express';
import multer from 'multer';
import { verifyDocument } from '../controllers/documentController.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// POST /api/documents/verify
router.post('/verify', upload.single('file'), verifyDocument);

export default router;
