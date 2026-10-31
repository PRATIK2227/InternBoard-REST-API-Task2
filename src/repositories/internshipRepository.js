import { randomUUID } from 'node:crypto';

const columns = `id, title, company, domain, mode, location, description, skills, openings, apply_url AS applyUrl, status, created_at AS createdAt, updated_at AS updatedAt`;
const toRecord = (row) => row ? { ...row, skills: JSON.parse(row.skills) } : null;

export class InternshipRepository {
  constructor(db) { this.db = db; }
  list({ q, domain, mode, status, page, limit, sort }) {
    const where = []; const params = {};
    if (q) { where.push('(title LIKE @q OR company LIKE @q OR description LIKE @q OR skills LIKE @q)'); params.q = `%${q}%`; }
    if (domain) { where.push('domain = @domain'); params.domain = domain; }
    if (mode) { where.push('mode = @mode'); params.mode = mode; }
    if (status) { where.push('status = @status'); params.status = status; }
    const clause = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const total = this.db.prepare(`SELECT COUNT(*) AS count FROM internships ${clause}`).get(params).count;
    const direction = sort === 'oldest' ? 'ASC' : 'DESC';
    const rows = this.db.prepare(`SELECT ${columns} FROM internships ${clause} ORDER BY created_at ${direction}, id ASC LIMIT @limit OFFSET @offset`)
      .all({ ...params, limit, offset: (page - 1) * limit });
    return { items: rows.map(toRecord), total };
  }
  findById(id) { return toRecord(this.db.prepare(`SELECT ${columns} FROM internships WHERE id = ?`).get(id)); }
  create(input) {
    const now = new Date().toISOString(); const id = randomUUID();
    this.db.prepare(`INSERT INTO internships (id,title,company,domain,mode,location,description,skills,openings,apply_url,status,created_at,updated_at) VALUES (@id,@title,@company,@domain,@mode,@location,@description,@skills,@openings,@applyUrl,@status,@now,@now)`)
      .run({ ...input, id, skills: JSON.stringify(input.skills), applyUrl: input.applyUrl || null, status: input.status || 'Open', now });
    return this.findById(id);
  }
  update(id, changes) {
    const current = this.findById(id); if (!current) return null;
    const next = { ...current, ...changes, updatedAt: new Date().toISOString() };
    this.db.prepare(`UPDATE internships SET title=@title,company=@company,domain=@domain,mode=@mode,location=@location,description=@description,skills=@skills,openings=@openings,apply_url=@applyUrl,status=@status,updated_at=@updatedAt WHERE id=@id`)
      .run({ ...next, skills: JSON.stringify(next.skills), applyUrl: next.applyUrl || null, id });
    return this.findById(id);
  }
  delete(id) { return this.db.prepare('DELETE FROM internships WHERE id = ?').run(id).changes > 0; }
  count() { return this.db.prepare('SELECT COUNT(*) AS count FROM internships').get().count; }
}
