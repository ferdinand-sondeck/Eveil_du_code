// app.js
const express = require('express');
const { getServices } = require('./services');

const app = express();

app.get('/api/services', (req, res) => {
  res.json(getServices());
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;
