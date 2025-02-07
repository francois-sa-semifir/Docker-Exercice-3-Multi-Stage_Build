# Variantes

## Faire fonctionner le Back et le Front en localhost

Au préalable dans le fichier `front/src/App.jsx` il faut modifier l'adresse qui est fetch de `/api/hello` à `http://localhost:8080/api/hello`

```js
  React.useEffect(() => {
    fetch('http://localhost:8080/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);
```

Cependant si on essaie de faire fonctionner en local nos 2 serveurs la console du front nous renvois une erreur.

Ce message indique un problème de CORS (“Cross-Origin Resource Sharing”).

Le front (hébergé sur `http://localhost:5173`) essaie de faire un fetch(`http://localhost:8080/api/hello`), donc vers un autre port, c’est considéré comme un autre domaine. Par défaut, le navigateur bloque la requête s’il ne reçoit pas les en-têtes adéquats du serveur (en particulier Access-Control-Allow-Origin).

1. Pour cela il faut installer une dépendance suplémentaire dans le Back

    ```bash
    npm install cors
    ```

    Exemple de `back/package.json`

    ```json
    {
      "name": "my-node-back",
      "version": "1.0.0",
      "main": "index.js",
      "scripts": {
        "start": "node index.js"
      },
      "dependencies": {
        "cors": "^2.8.5",
        "express": "^4.18.2"
      }
    }
    ```

2. Ensuite il faut modifier le fichier `back/index.js`

    ```js
    const express = require('express');
    const cors = require('cors');

    const app = express();
    const port = process.env.PORT || 8080;

    // --- Configuration CORS ---
    // Définir l'origine autorisée (l'URL de ton front)
    app.use(cors({
      origin: 'http://localhost:5173'
      // si tu veux autoriser plusieurs origines, tu peux utiliser un tableau
      // ex : origin: ['http://localhost:5173', 'http://localhost:3000']
    }));

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

    // Exemple de route API
    app.get('/api/hello', (req, res) => {
      res.json({ message: 'Hello, je fonctionne correctement !' });
    });

    // ...
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
    ```

## Créer et tester un contenur standalone du front (Single-Stage Build)

Par défaut, Vite lance le serveur en écoutant sur localhost (loopback) à l’intérieur d’un conteneur, cela rend le serveur inaccessible depuis l’hôte.

Pour contrebalancer cela il faut modifier le script `dev` du `front/package.json`, comme suit -`vite --host 0.0.0.0`

Exemple de `front/package.json`

```json
{
  "name": "my-react-front",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "vite": "^4.1.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```
