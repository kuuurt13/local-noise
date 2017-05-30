import axios from 'axios';
import config from '../../../configs/spotify';

const { apiUrl } = config;

export default {
  search,
  get
};

// TODO: Clean up search
function search(action, params) {
  let { artist, track, token } = params;

  switch (action) {
    case 'artist':
      return searchArtists(artist, token);

    case 'tracks':
      return searchTracks({ track, artist, token });
  }
}

function searchArtists(q, token) {
  const params = { q, type: 'artist' };
  return get('/search', params, token);
}

function searchTracks({ track, artist, token }) {
  let q = artist ? [`artist:${artist}`] : [];

  if (track) {
    q.push(track);
  }

  const params = { q: q.join(' '), type: 'track' };

  return get('/search', params, token);
}

function get(url, params, token) {
  let headers = {};

  if (token) {
    params.market = 'from_token';
    headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  console.log('REQUEST: Spotify =>', 'GET', url, params || 'N/A');

  return axios({
    method: 'get',
    url: `${apiUrl}${url}`,
    params,
    headers
  })
  .then(({ data }) => data)
  .catch(({ response }) => response);
}
