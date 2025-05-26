const express = require('express');
const morgan = require('morgan');
const { query, validationResult } = require('express-validator');

const app = express();
const port = 3000;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
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

// Exemple de validation
app.get('/api/echo',
  query('message').isLength({ min: 1 }).withMessage('Message requis'),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    res.json({ echoed: req.query.message });
  });

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});

app.use(express.static('public'));
