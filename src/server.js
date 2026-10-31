import { createApp } from './app.js';
import { createDatabase } from './config/database.js';
import { env } from './config/env.js';

const db = createDatabase();
const app = createApp(db);
const server = app.listen(env.port, () => console.log(`InternBoard API listening on http://localhost:${env.port}`));

function shutdown(signal) {
  console.log(`${signal} received. Closing server...`);
  server.close(() => { db.close(); process.exit(0); });
  setTimeout(() => process.exit(1), 10000).unref();
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
