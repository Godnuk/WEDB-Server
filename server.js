const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

let songHistory = [];

// Get the last 10 songs
app.get("/api/last10", (req, res) => {
  res.json(songHistory.slice(-10).reverse());
});

// Add a new song
app.post("/api/addSong", (req, res) => {
  const { title, artist } = req.body;
  if (!title || !artist) return res.status(400).send("Invalid song");

  const entry = `🎵 Now Playing: ${title} – ${artist}`;
  songHistory.push(entry);

  if (songHistory.length > 10) songHistory = songHistory.slice(-10);

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
