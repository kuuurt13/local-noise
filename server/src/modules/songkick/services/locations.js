import songkickApi from './api';

export default {
  search
}

async function search(query, location) {
  if (!query && !location) {
    throw Error({ status: 400, message: 'Need query or location (lat,lng)' })
  }

  if (query) {
    return await songkickApi.get('search/locations', { query });
  } else if (location) {
    return await songkickApi.get('search/locations', { location: `geo:${location}` });
  }
}
