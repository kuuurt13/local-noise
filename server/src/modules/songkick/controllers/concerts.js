import express from 'express';
import skConcerts from '../services/concerts';

const router = express.Router();

router.get('/concerts', getConcerts);
router.get('/concerts/search', searchConcerts);

/* Routes */
async function getConcerts(req, res) {
  const { location, page = 1, start, end } = req.query;

  const date = { start, end };

  try {
    let concerts = await skConcerts.get(location, date, page);
    res.status(200).json(concerts);
  } catch (err) {
    res.status(err.status || 500).send(err.message);
  }
}

async function searchConcerts(req, res) {
  const { location, page = 1, date } = req.query;

  try {
    let concerts = await skConcerts.search(location, date, page);
    res.status(200).json(concerts);
  } catch (err) {
    res.status(err.status || 500).send(err.message);
  }
}

export default router;
