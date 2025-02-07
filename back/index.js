const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <title>Back Express</title>
    </head>
    <body>
      <h1>Bienvenue sur mon serveur Express</h1>
    </body>
    </html>
  `);
});

// Exemple d'endpoint API
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, je fonctionne correctement !' });
});

// Endpoint de health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Servir les fichiers statiques du front (build Vite)
app.use(express.static(path.join(__dirname, 'public')));

// Redirection des autres routes vers l'index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
