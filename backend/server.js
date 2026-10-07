import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './src/routes/authRoutes.js';
import profileRoutes from './src/routes/profileRoutes.js';
import schemeRoutes from './src/routes/schemeRoutes.js';
import roadmapRoutes from './src/routes/roadmapRoutes.js';
import centerRoutes from './src/routes/centerRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import documentRoutes from './src/routes/documentRoutes.js';
import { initDatabase } from './src/config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(morgan('dev'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    project: 'SIH26092 - SchemeMatch AI Backend API',
    database: 'Supabase PostgreSQL',
    aiEngine: 'Google Gemini 3.6 Flash',
    ocrEngine: 'Tesseract OCR',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/centers', centerRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/documents', documentRoutes);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    requestedUrl: req.originalUrl,
    availableEndpoints: [
      '/api/health',
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/me',
      '/api/profile',
      '/api/schemes',
      '/api/schemes/match',
      '/api/schemes/:id/why-matched',
      '/api/documents/verify',
      '/api/roadmap/user/:userId',
      '/api/centers'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

let serverInstance = null;

export async function startServer() {
  await initDatabase();
  return new Promise((resolve) => {
    serverInstance = app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 SchemeMatch AI Backend Server running on port ${PORT}`);
      console.log(`📍 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🎯 Schemes API: http://localhost:${PORT}/api/schemes`);
      console.log(`📄 OCR Verify API: http://localhost:${PORT}/api/documents/verify`);
      console.log(`=======================================================`);
      resolve(serverInstance);
    });
  });
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].endsWith('server.js')) {
  startServer();
}

export default app;
