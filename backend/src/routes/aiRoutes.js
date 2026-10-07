import express from 'express';
import { handleAIChat, handleTTSProxy } from '../controllers/aiChatController.js';

const router = express.Router();

// POST /api/ai/chat
router.post('/chat', handleAIChat);

// GET /api/ai/tts
router.get('/tts', handleTTSProxy);

export default router;
