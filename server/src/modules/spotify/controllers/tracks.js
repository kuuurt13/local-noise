import express from 'express';
import { trackSearch } from '../services/tracks';

const router = express.Router();

router.get('/tracks', searchTracks);

/* Routes */
async function searchTracks(req, res) {
  const { artist, track } = req.query;

  const tracks = await trackSearch(track, artist);

  res.status(200).json(artist ? tracks.track : tracks);
}

export default router;
