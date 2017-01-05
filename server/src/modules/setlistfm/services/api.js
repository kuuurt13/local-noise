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
  .then(parseResp)
  .then(findLatestSet);
}

function parseResp(data) {
  data = JSON.stringify(data).replace(/@/g, '');
  return JSON.parse(data).setlist;
}

function findLatestSet(setlists) {
  let setlist = setlists.find(setlist => setlist.sets.set);

  if (setlist) {
    let { set } = setlist.sets;

    set = Object.keys(set).reduce((songs, type) => {
      return songs.concat(set[type].song || set.song);
    }, []);

    return { ...setlist, fullSetlist: set };
  }

  return setlist;
}
