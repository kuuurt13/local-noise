import express from 'express';
import spotifyApi from '../services/search';

const router = express.Router();

router.get('/tracks', searchTracks);

/* Routes */
async function searchTracks(req, res) {
  const { artist, track } = req.query;

  const tracks = await spotifyApi.search('tracks', { artist, track });
  res.status(200).json(tracks);
}

export default router;
