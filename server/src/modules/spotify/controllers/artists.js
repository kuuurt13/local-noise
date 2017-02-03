import express from 'express';
import spotifyCache from '../services/cache';
import artistsService from '../services/artists';
import tracksService from '../services/tracks';

const router = express.Router();

router.use('/artists', searchCachedArtists);

router.get('/artists/tracks', getArtistTracks);
router.get('/artists/:id', getArtistById);
router.get('/artists', getArtist);

/* Middleware */
async function searchCachedArtists(req, res, next) {
  const { query } = req.query;
  const artist = await spotifyCache.get(query);

  if (artist) {
    const { id, tracks } = artist;

    req.id = id;
    req.tracks = Object.keys(tracks).length ? tracks : false;
  }

  next();
}

/* Routes */
async function getArtistTracks(req, res) {
  const { query } = req.query;
  const { id, tracks } = req;

  if (tracks) {
    return res.status(200).json(tracks);
  }

  try {
    const artistTracks = await tracksService.getByArtist({ name: query, id });

    return res.status(200).json(artistTracks);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function getArtist(req, res) {
  const { query } = req.query;
  const { id } = req;

  try {
    let artist = id ? await artistsService.searchById(id) : await artistsService.search(query);

    return res.status(200).json(artist);
  } catch (error) {
    return res.status(404).json(error);
  }
}

async function getArtistById(req, res) {
  const { id } = req.params;

  try {
    const artist = await artistsService.artistById(id);
    return res.status(200).json(artist);
  } catch (error) {
    return res.status(404).json(error);
  }
}

export default router;
