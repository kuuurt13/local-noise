import axios from 'axios';
import config from '../../../configs/songkick';

const { apiUrl, apiKey } = config;
const defaultParams = { apikey: apiKey };

export default {
  get
};

function get(url, params) {
  console.log('REQUEST: Songkick =>', 'GET', url, params || 'N/A');

  return axios({
    method: 'get',
    url: `${apiUrl}${url}.json`,
    params: { ...params, ...defaultParams }
  })
  .then(res => res.data.resultsPage);
}
