// app.js
const express = require('express');
const { getServices } = require('./services');
const helmet = require('helmet');
const app = express();

const expressJwt = require('express-jwt');
const { secret } = require('./auth');

const jwtMiddleware = expressJwt({ secret, algorithms: ['HS256'] });

app.get('/api/services', (req, res) => {
  res.json(getServices());
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;




app.get('/api/protected', jwtMiddleware, (req, res) => {
  res.json({ message: 'Contenu sécurisé' });
});


app.use(helmet());
