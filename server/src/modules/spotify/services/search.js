import axios from 'axios';
import stringsMatch from '../../../shared/stringsMatch';
import redis from '../../../shared/redis';
import config from '../../../configs/spotify';

const { apiUrl } = config;

export function search(q, type = 'artist') {
  const params = { q, type };
  return get('/search', params);
}

export async function artistSearch(artistName) {
  try {
    let { artists } = await search(artistName);
    let artist = artists.items.find(artist => {
      return stringsMatch(artist.name, artistName);
    });

    if (artist) {
      redis.set(artistName, artist.id);
      return artistById(artist.id);
    }

    return Promise.reject('error');
  } catch (error) {
    return Promise.reject(error);
  }
}

export function artistById(id) {
  return get(`/artists/${id}`);
}

export function artistTracks(id) {
  return get(`/artists/${id}/tracks`);
}

/* Private */
function get(url, params) {
  return axios({
    method: 'get',
    url: `${apiUrl}${url}`,
    params
  })
  .then(res => res.data);
}
