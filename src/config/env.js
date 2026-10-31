import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDir, '../..');
const configuredDb = process.env.DATABASE_FILE || './data/internboard.sqlite';

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number.parseInt(process.env.PORT || '4000', 10),
  databaseFile: path.isAbsolute(configuredDb) ? configuredDb : path.resolve(projectRoot, configuredDb),
  corsOrigin: process.env.CORS_ORIGIN || '*',
  rateLimitWindowMs: Number.parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  rateLimitMax: Number.parseInt(process.env.RATE_LIMIT_MAX || '100', 10)
};
