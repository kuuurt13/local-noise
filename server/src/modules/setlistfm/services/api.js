import axios from 'axios';
import setlistfmConfig from '../../../configs/setlistfm';

const { apiUrl } = setlistfmConfig;

export default {
  get
};

function get(mid, params) {
  console.log('REQUEST: SetlistFM =>', 'GET', mid);

  return axios({
    method: 'get',
    url: `${apiUrl}artist/${mid}/setlists.json`
  })
  .then(res => res.data.setlists)
  .then(mapResp);
}

function mapResp(data) {
  data = JSON.stringify(data).replace(/@/g, '');
  return JSON.parse(data);
}
