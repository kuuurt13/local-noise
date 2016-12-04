import express from 'express';
import redis from '../../../shared/redis';
import { artistSearch, artistById } from '../services/artists';
import { artistTrackSearch } from '../services/tracks';

const router = express.Router();

router.use('/artists', searchCachedArtists);

router.get('/artists/tracks', getArtistTracks);
router.get('/artists/:id', getArtistById);
router.get('/artists', getArtist);

/* Middleware */
async function searchCachedArtists(req, res, next) {
  const { query } = req.query;
  const artist = await redis.get(query);

  if (artist) {
    const { id, tracks } = artist;

    req.id = id;
    req.tracks = tracks;
  }

  next();
}

/* Routes */
async function getArtistTracks(req, res) {
  const { query } = req.query;
  const { id, tracks } = req;

  console.log(id, tracks);

  if (tracks) {
    return res.status(200).json(tracks);
  }

  try {
    const artistTracks = await artistTrackSearch(query, id);
    console.log(artistTracks);
    return res.status(200).json(artistTracks);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function getArtist(req, res) {
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
