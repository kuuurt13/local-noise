import redis from '../../../shared/redis';
import stringsMatch from '../../../shared/stringsMatch';
import spotify from './search';

export default {
  search,
  searchById
}

async function search(artistName) {
  try {
    let artist;

    artist = await redis.get(artistName);

    if (artist) {
      return Promise.resolve(artist);
    }

    let { artists } = await spotify.search('artist', { artist: artistName });
    artist = artists.items.find(artist => {
      return stringsMatch(artist.name, artistName);
    });

    if (artist) {
      const { id } = artist;

      redis.set(artistName, { id });
      return searchById(id);
    }

    return Promise.reject({ status: 404 });
  } catch (error) {
    return Promise.reject({ status: 500 });
  }
}

function searchById(id) {
  return spotify.get(`/artists/${id}`);
}

