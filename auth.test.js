const { generateToken } = require('./auth');
const jwt = require('jsonwebtoken');

describe('auth.js', () => {
  it('should generate a valid JWT token', () => {
    const user = { id: 123, name: 'Georges' };
    const token = generateToken(user);

    const decoded = jwt.decode(token);
    expect(decoded.user).toEqual(user);
  });
});
