// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let lastTenSongs = [];

app.use(express.json());

// Get list
app.get('/songs', (req, res) => {
  res.json(lastTenSongs);
});

// Add song
app.post('/songs', (req, res) => {
  const { title, artist } = req.body;
  if (!title || !artist) return res.status(400).send('Missing title or artist');

  lastTenSongs.unshift({ title, artist, timestamp: new Date() });
  if (lastTenSongs.length > 10) lastTenSongs.pop();

  res.status(200).send('Added');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
