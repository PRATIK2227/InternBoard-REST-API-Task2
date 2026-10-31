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
