import axios from 'axios';
import queryString from '../../../shared/queryString';
import spotifyConfig from '../../../configs/spotify';

const {
  authUrl,
  tokenUrl,
  userUrl,
  auth
} = spotifyConfig;

export default {
  login,
  loginRedirect,
  handleLoginRedirect,
  renewToken
};

async function login(code) {
  const { token, refresh } = await getTokens(code);
  const { id } = await getUser(token, refresh);

  return { token, refresh, id };
}

function loginRedirect() {
  return `${authUrl}?` +
    queryString({
      client_id: auth.id,
      scope: 'user-read-private playlist-modify-public',
      redirect_uri: auth.redirectUrl,
      response_type: 'code',
      show_dialog: true
    });
}

function handleLoginRedirect({ token, refresh, id }) {
  return `${auth.redirectUrl}?${queryString({ token, refresh, id })}`;
}

async function renewToken(refresh) {
  let { token } = await tokenRequest({
    refresh_token: refresh,
    grant_type: 'refresh_token'
  });

  return token;
}

/* Private */
function getUser(token, refresh) {
  return axios({
    method: 'get',
    url: userUrl,
    headers: {
      'Authorization': getAuthHeader({ token })
    }
  })
    .then(res => res.data);
}

function getTokens(code) {
  return tokenRequest({
    code,
    redirect_uri: auth.redirectUrl,
    grant_type: 'authorization_code'
  });
}

async function tokenRequest(params) {
  const { id, secret } = auth;

  let { data } = await axios({
    method: 'post',
    url: tokenUrl,
    params,
    headers: {
      'Authorization': getAuthHeader({ id, secret })
    },
    json: true
  });

  return {
    token: data.access_token,
    refresh: data.refresh_token
  };
}

function getAuthHeader({ token, id, secret }) {
  if (token) {
    return `Authorization: Bearer ${token}`;
  }

  return `Basic ${(new Buffer(`${id}:${secret}`).toString('base64'))}`;
}
