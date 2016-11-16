import express from 'express';
import redis from '../../../shared/redis';
import { artistSearch, artistById } from '../services/search';

const router = express.Router();

router.use('/artists', searchCachedArtists);
router.get('/artists', getArtist);
router.get('/artists/:id', getArtistById);

/* Middleware */
async function searchCachedArtists(req, res, next) {
  const { query } = req.query;
  const artistId = await redis.get(query);

  if (artistId) {
    req.query.id = artistId;
  }

  next();
}

/* Routes */
async function getArtist(req, res) {
  const { query, id } = req.query;

  try {
    let artist = id ? await artistById(id) : await artistSearch(query);
    res.status(200).json(artist);
  } catch(error) {
    res.status(404).json(error);
  }
}

async function getArtistById(req, res) {
  const { id } = req.params;

  try {
    const artist = await artistById(id);
    res.status(200).json(artist);
  } catch(error) {
    res.status(404).json(error);
  }
}

export default router;
