import { format } from 'date-fns';
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
      min_date: format(new Date(date.start), 'YYYY-MM-DD'),
      max_date: format(new Date(date.end), 'YYYY-MM-DD')
    });
  });

  const concerts = await Promise.all(reqs);

  return concertDates.map((date, i) => {
    return { ...date, concerts: songkickApi.mapResp(concerts[i], 'event') };
  });
}
