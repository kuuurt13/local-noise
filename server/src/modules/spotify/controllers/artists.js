import express from 'express';
import redis from '../../../shared/redis';
import { artistSearch, artistById } from '../services/artists';
import { artistTrackSearch } from '../services/tracks';

const router = express.Router();

router.use('/artists', searchCachedArtists);

router.get('/artists/tracks', getArtistTopTracks);
router.get('/artists/:id', getArtistById);
router.get('/artists', getArtists);

/* Middleware */
async function searchCachedArtists(req, res, next) {
  const { query } = req.query;
  const artist = await redis.get(query);

  if (artist) {
    const { id, trackIds } = artist;

    req.id = id;
    req.trackIds = trackIds;
  }

  next();
}

/* Routes */
async function getArtistTopTracks(req, res) {
  const { query } = req.query;
  const { id, trackIds } = req;

  if (trackIds) {
    return res.status(200).json(trackIds);
  }

  try {
    const tracks = await artistTrackSearch(query, id);
    return res.status(200).json(tracks);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function getArtists(req, res) {
  const { query } = req.query;
  const { id } = req;

  try {
    let artist = id ? await artistById(id) : await artistSearch(query);
    return res.status(200).json(artist);
  } catch (error) {
    return res.status(404).json(error);
  }
}

async function getArtistById(req, res) {
  const { id } = req.params;

  try {
    const artist = await artistById(id);
    return res.status(200).json(artist);
  } catch (error) {
    return res.status(404).json(error);
  }
}

export default router;
