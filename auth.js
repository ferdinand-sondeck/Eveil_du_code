// auth.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secret_key';

function generateToken(user) {
  return jwt.sign({ user }, secret, { expiresIn: '1h' });
}

module.exports = { generateToken, secret };
