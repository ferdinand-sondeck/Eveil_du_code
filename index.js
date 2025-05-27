// index.js
const https = require('https');
const fs = require('fs');
const app = require('./app'); // 👈 utilise l’app complète et sécurisée

const options = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem')
};

const port = 3000;

https.createServer(options, app).listen(port, () => {
  console.log(`Serveur HTTPS lancé sur le port ${port}`);
});
