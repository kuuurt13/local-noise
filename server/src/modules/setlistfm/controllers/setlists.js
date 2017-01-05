import express from 'express';
import setlistApi from '../services/api';

const router = express.Router();

router.get('/setlists/:mid', getSetlistById);

/* Routes */
async function getSetlistById(req, res) {
  try {
    const { mid } = req.params;

    if (!mid) {
      throw Error({ status: 400, message: 'Missing mid' });
    }

    // Add caching
    const setlists = await setlistApi.get(mid);

    res.status(200).json(setlists);
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

export default router;
