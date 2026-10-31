import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import request from 'supertest';
import { createDatabase } from '../src/config/database.js';
import { createApp } from '../src/app.js';

let db; let app;
const validRecord = { title: 'Backend Intern', company: 'Orbit Labs', domain: 'Full Stack Development', mode: 'Remote', location: 'India', description: 'Build and test API features.', skills: ['Node.js', 'SQLite'], openings: 2, applyUrl: 'https://example.com/apply', status: 'Open' };
beforeEach(() => { db = createDatabase(':memory:'); app = createApp(db); });
afterEach(() => db.close());

describe('Internship API', () => {
  it('creates a record and returns 201', async () => {
    const response = await request(app).post('/api/internships').send(validRecord).expect(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe(validRecord.title);
    expect(response.body.data.id).toMatch(/^[0-9a-f-]{36}$/i);
  });
  it('rejects invalid create payloads', async () => {
    const response = await request(app).post('/api/internships').send({ title: '' }).expect(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
    expect(response.body.error.details.length).toBeGreaterThan(0);
  });
  it('lists records with pagination metadata', async () => {
    await request(app).post('/api/internships').send(validRecord).expect(201);
    const response = await request(app).get('/api/internships?page=1&limit=1').expect(200);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.meta).toMatchObject({ page: 1, limit: 1, total: 1, totalPages: 1 });
  });
  it('gets, updates and deletes a record', async () => {
    const created = await request(app).post('/api/internships').send(validRecord).expect(201);
    const id = created.body.data.id;
    await request(app).get(`/api/internships/${id}`).expect(200);
    const updated = await request(app).patch(`/api/internships/${id}`).send({ openings: 5 }).expect(200);
    expect(updated.body.data.openings).toBe(5);
    await request(app).delete(`/api/internships/${id}`).expect(200);
    await request(app).get(`/api/internships/${id}`).expect(404);
  });
  it('returns 400 for malformed record identifiers', async () => {
    const response = await request(app).get('/api/internships/x').expect(400);
    expect(response.body.success).toBe(false);
  });
  it('returns 404 for unknown routes', async () => { await request(app).get('/api/unknown').expect(404); });
});
