import axios from 'axios';
import setlistfmConfig from '../../../configs/setlistfm';
import setlistCache from './cache';

const { apiUrl } = setlistfmConfig;

export default {
  search
};

async function search(mid, params) {
  let setlist = await setlistCache.get(mid);

  if (setlist) {
    console.log('CACHE: Setlist =>', mid);
    return setlist;
  }

  const setlists = await getSetlists(mid);

  setlist = findLatestSet(setlists);

  return setlistCache.set(mid, setlist);
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

  return {};
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
