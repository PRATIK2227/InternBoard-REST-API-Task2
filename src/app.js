import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { requestId } from './middleware/requestId.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import { InternshipRepository } from './repositories/internshipRepository.js';
import { InternshipService } from './services/internshipService.js';
import { InternshipController } from './controllers/internshipController.js';
import { createInternshipRouter } from './routes/internshipRoutes.js';

export function createApp(db) {
  const app = express();
  const repository = new InternshipRepository(db);
  const service = new InternshipService(repository);
  const controller = new InternshipController(service);
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: env.corsOrigin === '*' ? '*' : env.corsOrigin.split(',').map((value) => value.trim()) }));
  app.use(express.json({ limit: '1mb' }));
  app.use(requestId);
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
  app.use('/api', rateLimit({ windowMs: env.rateLimitWindowMs, limit: env.rateLimitMax, standardHeaders: 'draft-8', legacyHeaders: false }));
  app.get('/health', (_req, res) => res.json({ success: true, data: { status: 'ok', service: 'internboard-api' } }));
  app.use('/api/internships', createInternshipRouter(controller));
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
