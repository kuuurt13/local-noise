import express from 'express';
import songkickConcerts from '../services/concerts';

const router = express.Router();

router.get('/concerts/search', getConcerts);

/* Routes */
async function getConcerts(req, res) {
  const { id, page, date } = req.query;

  try {
    let concerts = await songkickConcerts.search(id, date, page || 1);
    res.status(200).json(concerts);
  } catch (err) {
    res.status(err.status || 500).send(err.message);
  }
}

export default router;
