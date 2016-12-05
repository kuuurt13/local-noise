import axios from 'axios';
import redis from '../../../shared/redis';
import config from '../../../configs/spotify';

const { apiUrl } = config;

export default {
  search,
  get
};

//TODO: Clean up search
function search(action, params) {
  let { artist, track } = params;

  switch (action) {
    case 'artist':
      return searchArtists(artist);

    case 'tracks':
      return searchTracks(track, artist);
  }
}

function searchArtists(q) {
  const params = { q, type: 'artist' };
  return get('/search', params);
}

function searchTracks(track, artist) {
  const q = artist ? `artist:${artist} ${track}` : track;
  const params = { q , type: 'track' };

  return get('/search', params);
}

function get(url, params) {
  return axios({
    method: 'get',
    url: `${apiUrl}${url}`,
    params
  })
  .then(res => res.data);
}
