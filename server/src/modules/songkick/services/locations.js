import songkickApi from './api';

export default {
  search
};

async function search(query, location) {
  let locations;

  if (!query && !location) {
    throw Error({ status: 400, message: 'Need query or location (lat,lng)' });
  }

  if (query) {
    locations = await songkickApi.get('search/locations', { query });
  } else if (location) {
    locations = await songkickApi.get('search/locations', { location: `geo:${location}` });
  }

  return songkickApi.mapResp(locations, 'location');
}
