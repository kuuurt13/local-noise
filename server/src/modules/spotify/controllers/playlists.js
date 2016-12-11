import express from 'express';
import spotifyPlaylist from '../services/playlists';

const router = express.Router();

router.post('/playlists/create', createPlaylist);

async function createPlaylist(req, res) {
  const { artist, tracks } = req.body;

  try {
    const artistTracks = await spotifyPlaylist.create(artist, tracks);

    res.status(200).json(artistTracks);
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
}

export default router;
