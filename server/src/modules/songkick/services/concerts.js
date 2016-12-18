import { chunkDates } from '../../../shared/dates';
import songkickApi from './api';


export default {
  search
};

async function search(location, date, page) {
  if (!location || !date) {
    throw Error({ status: 400, message: 'Need location code/date' });
  }

  let concertDates = chunkDates(date, 4);

  const reqs = concertDates.map(date => {
    return songkickApi.get('events', {
      location: `sk:${location}`,
      min_date: Date.parse(date.start).toString('yyyy-MM-dd'),
      max_date: Date.parse(date.end).toString('yyyy-MM-dd')
    });
  });

  const concerts = await Promise.all(reqs);

  return concertDates.map((date, i) => {
    return { ...date, concerts: songkickApi.mapResp(concerts[i], 'event') };
  });
}
