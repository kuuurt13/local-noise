import axios from 'axios';
import stringsMatch from '../../../util/stringsMatch';
import config from '../../../config/app';

const { spotifyUrl } = config;

export function search(q, type = 'artist') {
  const params = { q, type };
  return get('/search', params);
}

export async function artistSearch(artistName) {
  let { artists } = await search(artistName);
  let artist = artists.items.find(artist => stringsMatch(artist.name, artistName));

  return Promise.resolve(artist);
}

export function artistById(id) {
  return get(`/artists/${id}`);
}

/* Private */
function get(url, params) {
  return axios({
    method: 'get',
    url: `${spotifyUrl}${url}`,
    params
  })
  .then(res => res.data);
}
