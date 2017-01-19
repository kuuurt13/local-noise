import express from 'express';
import spotifyAuth from '../services/auth';

const router = express.Router();

router.get('/auth/login', login);
router.get('/auth/handle-login', handleLogin);
router.post('/auth/token', getToken);

function login(req, res) {
  res.redirect(spotifyAuth.loginRedirect());
}

async function handleLogin(req, res) {
  const { code, token, refresh, id } = req.query;

  if (token) {
    res.status(200).json({ token, refresh, id });
  }

  try {
    const credentials = await spotifyAuth.login(code);
    res.redirect(spotifyAuth.handleLoginRedirect(credentials));
  } catch (err) {
    res.status(err.status || 500).json(err.message || err);
  }
}

async function getToken(req, res) {
  const { refresh } = req.body;

  try {
    let token = await spotifyAuth.renewToken(refresh);
    res.status(200).json({ token });
  } catch (err) {
    res.status(err.status || 500).json(err.message || err);
  }
}

export default router;
