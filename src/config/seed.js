import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDatabase } from './database.js';
import { InternshipRepository } from '../repositories/internshipRepository.js';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const recordsPath = path.join(root, 'data/internship-records-sample.json');
const records = JSON.parse(fs.readFileSync(recordsPath, 'utf8')).internships;
const db = createDatabase();
const repository = new InternshipRepository(db);
const insert = db.transaction((items) => {
  for (const item of items) {
    const existing = db.prepare('SELECT id FROM internships WHERE id = ?').get(item.id);
    if (existing) continue;
    const now = new Date().toISOString();
    db.prepare(`INSERT INTO internships (id,title,company,domain,mode,location,description,skills,openings,apply_url,status,created_at,updated_at) VALUES (@id,@title,@company,@domain,@mode,@location,@description,@skills,@openings,@applyUrl,@status,@now,@now)`)
      .run({ id: item.id, title: item.title, company: item.company, domain: item.domain, mode: item.mode, location: item.location, description: item.description || `${item.title} opportunity. Work with the team and build practical skills.`, skills: JSON.stringify(item.skills), openings: item.openings, applyUrl: item.applyUrl || null, status: item.status || 'Open', now });
  }
});
insert(records);
console.log(`Seed complete. ${repository.count()} internship record(s) available.`);
db.close();
