// app.js
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const { getServices } = require('./services');
const { expressjwt: jwtMiddleware } = require('express-jwt');
const { secret } = require('./auth');
const { query, validationResult } = require('express-validator');
const promClient = require('prom-client');

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// Prometheus metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const httpResponseTimeHistogram = new promClient.Histogram({
  name: 'http_response_time_seconds',
  help: 'HTTP response time in seconds',
  labelNames: ['method', 'route', 'status']
});

app.use((req, res, next) => {
  const end = httpResponseTimeHistogram.startTimer();
  res.on('finish', () => {
    const route = req.route?.path || req.path;
    httpRequestCounter.labels(req.method, route, res.statusCode).inc();
    end({ method: req.method, route, status: res.statusCode });
  });
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// Routes publiques
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/api/services', (req, res) => {
  res.json(getServices());
});

app.get('/api/echo',
  query('message').isLength({ min: 1 }).withMessage('Message requis'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    res.json({ echoed: req.query.message });
  }
);

// Routes protégées par JWT
app.get('/api/protected', jwtMiddleware({ secret, algorithms: ['HS256'] }), (req, res) => {
  res.json({ message: 'Accès sécurisé autorisé !' });
});

module.exports = app;
