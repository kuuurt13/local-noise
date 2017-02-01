import express from 'express';
import tracksService from '../services/tracks';

const router = express.Router();

router.get('/tracks', searchTracks);

/* Routes */
async function searchTracks(req, res) {
  const { artist, track } = req.query;

  const tracks = await tracksService.getTrack({ track, artist });

  res.status(200).json(artist ? tracks.track : tracks);
}

export default router;
