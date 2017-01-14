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
  getCredentials,
  loginRedirect,
  handleLoginRedirect
};

async function getCredentials(code) {
  const { token, refresh } = await getTokens(code);
  const { id } = await getUser(token, refresh);

  return { token, refresh, id };
}

function loginRedirect() {
  return `${authUrl}?` +
    queryString({
      client_id: auth.id,
      scope: auth.scopes,
      redirect_uri: auth.redirectUrl,
      response_type: 'code',
      show_dialog: true
    });
}

function handleLoginRedirect({ token, refresh, id }) {
  return `${auth.redirectUrl}?${queryString({ token, refresh, id })}`;
}

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
  const { id, secret } = auth;

  return axios({
    method: 'post',
    url: tokenUrl,
    params: {
      code,
      redirect_uri: auth.redirectUrl,
      grant_type: auth.grantType
    },
    headers: {
      'Authorization': getAuthHeader({ id, secret })
    },
    json: true
  })
  .then(({ data }) => {
    return {
      token: data.access_token,
      refresh: data.refresh_token
    };
  });
}

function getAuthHeader({ token, id, secret }) {
  if (token) {
    return `Authorization: Bearer ${token}`;
  }

  return `Basic ${(new Buffer(`${id}:${secret}`).toString('base64'))}`;
}
