
const request = require('supertest');
const app = require('./app'); // votre app Express
const { generateToken } = require('./auth');

describe('GET /api/services', () => {
  it('should return 200 and list of services', async () => {
    const res = await request(app).get('/api/services');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/echo', () => {
  it('should echo back a valid message', async () => {
    const res = await request(app).get('/api/echo?message=bonjour');
    expect(res.statusCode).toBe(200);
    expect(res.body.echoed).toBe('bonjour');
  });

  it('should return 400 if message is missing', async () => {
    const res = await request(app).get('/api/echo');
    expect(res.statusCode).toBe(400);
  });
});

describe('GET /api/protected', () => {
  it('should return 401 without token', async () => {
    const res = await request(app).get('/api/protected');
    expect(res.statusCode).toBe(401);
  });

  it('should allow access with valid token', async () => {
    const token = generateToken({ username: 'georges' });
    const res = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Accès sécurisé/i);
  });
});
