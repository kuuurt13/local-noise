import express from 'express';
import spotifyPlaylist from '../services/playlists';

const router = express.Router();

router.post('/playlists/create/:userId', createPlaylist);

async function createPlaylist(req, res) {
  const { token, refresh } = req.body;

  if (!token || !refresh) {
    res.status(400).json({ error: 'Missing Spotify Auth tokens' });
  }

  try {
    const { userId } = req.params;

    const playlist = await spotifyPlaylist.create({ userId, ...req.body });

    res.status(200).json(playlist);
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
}

export default router;
