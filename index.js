const express = require('express');
const morgan = require('morgan');
const { query, validationResult } = require('express-validator');
const https = require('https');
const fs = require('fs');
const promClient = require('prom-client'); // Ajouté pour Prometheus

const httpResponseTimeHistogram = new promClient.Histogram({
  name: 'http_response_time_seconds',
  help: 'Durée des réponses HTTP en secondes',
  labelNames: ['method', 'route', 'status']
});


const app = express();
const port = 3000;

// Middlewares existants
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// --- Configuration Prometheus Metrics ---
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics(); // Collecte les métriques par défaut (CPU, mémoire, etc.)

// Compteur pour le nombre total de requêtes HTTP
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP reçues',
  labelNames: ['method', 'route', 'status_code'] // 'status' renommé en 'status_code' pour éviter confusion
});

// Middleware pour compter les requêtes HTTP
app.use((req, res, next) => {
  res.on('finish', () => {
    // Utilise req.route.path si disponible pour un meilleur regroupement, sinon req.path
    const route = req.route && req.route.path ? req.route.path : req.path;
    httpRequestCounter.labels(req.method, route, res.statusCode).inc();
  });
  next();
});


app.use((req, res, next) => {
  const end = httpResponseTimeHistogram.startTimer();
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
    end({ method: req.method, route: req.path, status: res.statusCode });
  });
  next();
});


// Endpoint pour exposer les métriques Prometheus
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', promClient.register.contentType);
    res.end(await promClient.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});
// --- Fin de la configuration Prometheus Metrics ---

// Routes existantes
app.get('/api/services', (req, res) => {
  res.json([
    { id: 1, name: 'Hébergement Cloud' },
    { id: 2, name: 'Surveillance de Systèmes' },
    { id: 3, name: 'Consulting DevOps' }
  ]);
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok' });
});

// Exemple de validation existant
app.get('/api/echo',
  query('message').isLength({ min: 1 }).withMessage('Message requis'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    res.json({ echoed: req.query.message });
  });

// Configuration HTTPS existante
const options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

// Démarrage du serveur HTTPS existant
https.createServer(options, app).listen(port, () => {
  console.log(`Serveur HTTPS lancé sur le port ${port}`);
  console.log(`Métriques Prometheus disponibles sur https://localhost:${port}/metrics`);
});