import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import app, { startServer } from '../server.js';

let server = null;
const BASE_URL = 'http://localhost:5000';

before(async () => {
  server = await startServer();
});

after(() => {
  if (server) server.close();
});

describe('API Integration & Security Tests', () => {
  it('GET /api/health - returns healthy status and engine signatures', async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'healthy');
    assert.ok(data.aiEngine.includes('Gemini'));
  });

  it('POST /api/auth/register - hashes password and returns signed JWT', async () => {
    const uniqueEmail = `testuser_${Date.now()}@schemematch.ai`;
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Entrepreneur',
        email: uniqueEmail,
        password: 'securePassword123!',
        sector: 'Manufacturing',
        socialCategory: 'OBC'
      })
    });

    assert.strictEqual(res.status, 201);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(data.token);
    assert.strictEqual(data.user.email, uniqueEmail);
  });

  it('POST /api/auth/login - validates password with bcrypt and returns token', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@123',
        password: 'admin123'
      })
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.user.role, 'admin');
    assert.ok(data.token);
  });

  it('POST /api/auth/login - rejects invalid credentials with 401', async () => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@123',
        password: 'wrong_password_xyz'
      })
    });

    assert.strictEqual(res.status, 401);
  });

  it('GET /api/schemes - retrieves schemes catalog', async () => {
    const res = await fetch(`${BASE_URL}/api/schemes`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.ok(data.count > 0);
  });

  it('POST /api/schemes/match - executes authoritative 5-factor matching', async () => {
    const res = await fetch(`${BASE_URL}/api/schemes/match`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sector: 'Food Processing',
        socialCategory: 'OBC',
        gender: 'male',
        locationType: 'rural',
        fundingRequiredNum: 500000,
        age: 28
      })
    });

    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.strictEqual(data.data[0].id, 'pmegp');
    assert.strictEqual(data.data[0].matchScore, 100);
  });

  it('POST /api/schemes - rejects unauthorized requests to create scheme with 401', async () => {
    const res = await fetch(`${BASE_URL}/api/schemes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Hacker Scheme',
        department: 'Illegal Dept'
      })
    });

    assert.strictEqual(res.status, 401);
  });

  it('POST /api/documents/verify - rejects missing document with 400', async () => {
    const res = await fetch(`${BASE_URL}/api/documents/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        documentType: 'aadhaar'
      })
    });

    assert.strictEqual(res.status, 400);
    const data = await res.json();
    assert.strictEqual(data.verified, false);
  });
});
