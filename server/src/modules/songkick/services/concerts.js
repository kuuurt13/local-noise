import { format } from 'date-fns';
import { chunkDates } from '../../../shared/dates';
import skApi from './api';
import skCache from './cache';


export default {
  get,
  search
};

async function get(location, date, page) {
  if (!location || !date) {
    throw Error({ status: 400, message: 'Need location & start/end date' });
  }

  return getConcert({ location, date, page });
}

async function search(location, date, page) {
  if (!location || !date) {
    throw Error({ status: 400, message: 'Need location code/date' });
  }

  const dates = chunkDates(date, 4, page);

  return await Promise.all(
    dates.map(date => getConcert({ location, date, page }))
  );
}

async function getConcert(params) {
  let { location, date, page } = params;

  let concerts = await skCache.get(params);

  if (concerts) {
    console.log('CACHE: SongKick > Concerts: ', params);
    return concerts;
  }

  concerts = await skApi.get('events', {
    location: `sk:${location}`,
    min_date: format(new Date(date.start), 'YYYY-MM-DD'),
    max_date: format(new Date(date.end), 'YYYY-MM-DD'),
    per_page: 50,
    page
  });

  concerts = { ...date, concerts: skApi.mapResp(concerts, 'event') };

  skCache.set(params, concerts);
  return concerts;
}
