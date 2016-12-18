import express from 'express';
import songkickLocations from '../services/locations';

const router = express.Router();

router.get('/locations', getLocations);

/* Routes */
async function getLocations(req, res) {
  const { query, location } = req.query;

  try {
    let locations = await songkickLocations.search(query, location);
    res.status(200).json(locations);
  } catch (err) {
    res.status(err.status || 500).send(err.message);
  }
}

export default router;
