import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import { env } from './env.js';

export function createDatabase(filename = env.databaseFile) {
  if (filename !== ':memory:') fs.mkdirSync(path.dirname(filename), { recursive: true });
  const db = new Database(filename);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.exec(`
    CREATE TABLE IF NOT EXISTS internships (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      domain TEXT NOT NULL,
      mode TEXT NOT NULL CHECK (mode IN ('Remote','Hybrid','On-site')),
      location TEXT NOT NULL,
      description TEXT NOT NULL,
      skills TEXT NOT NULL,
      openings INTEGER NOT NULL CHECK (openings > 0),
      apply_url TEXT,
      status TEXT NOT NULL DEFAULT 'Open' CHECK (status IN ('Open','Closed')),
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_internships_domain ON internships(domain);
    CREATE INDEX IF NOT EXISTS idx_internships_status ON internships(status);
    CREATE INDEX IF NOT EXISTS idx_internships_created_at ON internships(created_at);
  `);
  return db;
}
