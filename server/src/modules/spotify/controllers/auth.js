import express from 'express';
import spotifyAuth from '../services/auth';

const router = express.Router();

router.get('/auth/login', login);
router.get('/auth/handle-login', handleLogin);

function login(req, res) {
  res.redirect(spotifyAuth.loginRedirect());
}

async function handleLogin(req, res) {
  const { code, token, refresh, id } = req.query;

  if (token) {
    res.status(200).json({ token, refresh, id });
  }

  try {
    const credentials = await spotifyAuth.getCredentials(code);
    res.redirect(spotifyAuth.handleLoginRedirect(credentials));
  } catch (err) {
    res.status(err.status || 500).json(err);
  }
}

export default router;
