import { format } from 'date-fns';
import { chunkDates } from '../../../shared/dates';
import skApi from './api';
import skCache from './cache';


export default {
  search
};

async function search(location, date, page) {
  if (!location || !date) {
    throw Error({ status: 400, message: 'Need location code/date' });
  }

  let params = { location, date, page };

  let results = await skCache.get(params);

  if (results) {
    console.log('CACHED: SongKick => Concerts: ', params);
    return results;
  }

  const dates = chunkDates(date, 4);

  const resps = await Promise.all(
    dates.map(date => getConcert(location, date))
  );

  results = resps.map((date, i) => resps[i]);

  skCache.set(params, results);
  return results;
}

async function getConcert(location, date) {
  let resp = await skApi.get('events', {
    location: `sk:${location}`,
    min_date: format(new Date(date.start), 'YYYY-MM-DD'),
    max_date: format(new Date(date.end), 'YYYY-MM-DD'),
    per_page: 1
  });

  return { ...date, concerts: skApi.mapResp(resp, 'event') };
}
