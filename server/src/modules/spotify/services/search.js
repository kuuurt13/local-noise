import axios from 'axios';
import redis from '../../../shared/redis';
import config from '../../../configs/spotify';

const { apiUrl } = config;

function search(q, type = 'artist') {
  const params = { q, type };
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

export default {
  search,
  get
}
