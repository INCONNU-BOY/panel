// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bots = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/bots', (req, res) => {
  res.json(bots);
});

app.post('/api/create', (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) return res.status(400).json({ error: 'Missing fields' });

  const bot = {
    id: bots.length + 1,
    name,
    type,
    createdAt: new Date().toISOString()
  };

  bots.push(bot);
  res.json({ message: 'Bot created successfully', bot });
});

app.listen(PORT, () => {
  console.log(`QUEEN ASUNA PANEL active: http://localhost:${PORT}`);
});
