import express from 'express';
import { artistSearch, artistById } from '../services/search';

const router = express.Router();

router.get('/artists', getArtists);
router.get('/artists/:id', getArtistById);

async function getArtists(req, res) {
  const { query } = req.query;

  let artists = await artistSearch(query);
  res.status(200).json(artists);
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
