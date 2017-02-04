import axios from 'axios';
import setlistfmConfig from '../../../configs/setlistfm';

const { apiUrl } = setlistfmConfig;

export default {
  search
};

async function search(mid, params) {
  let setlists = await getSetlists(mid);

  return findLatestSet(setlists);
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
      songs = songs.concat(set[type].song || set.song);
      return songs.filter(song => song.name);
    }, []);

    return { ...setlist, fullSetlist: set };
  }

  return setlist || {};
}

function getSetlists(mid) {
  console.log('REQUEST: SetlistFM =>', 'GET', mid);

  return axios({
    method: 'get',
    url: `${apiUrl}artist/${mid}/setlists.json`
  })
  .then(res => res.data.setlists || {})
  .then(parseResp);
}
