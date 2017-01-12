import express from 'express';
import queryString from '../../../shared/queryString';
import spotifyConfig from '../../../configs/spotify';

const router = express.Router();

router.get('/auth/login', login);
router.get('/auth/handle-login', handleLogin);

function login(req, res) {
  const { authUrl, authParams } = spotifyConfig;
  res.redirect(`${authUrl}?` +
    queryString({
      client_id: authParams.appId,
      scope: authParams.scopes,
      redirect_uri: authParams.redirectUrl,
      response_type: 'code',
      show_dialog: true
    })
  );
}

function handleLogin(req, res) {
  const { code } = req.query;

  res.status(200).json({ code });
}

export default router;
