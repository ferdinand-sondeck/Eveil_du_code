
const request = require('supertest');
const app = require('./app'); // votre app Express

describe('GET /api/services', () => {
  it('should return 200 and list of services', async () => {
    const res = await request(app).get('/api/services');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
