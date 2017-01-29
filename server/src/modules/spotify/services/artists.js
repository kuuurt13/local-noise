import stringsMatch from '../../../shared/stringsMatch';
import spotifyCache from './cache';
import spotify from './search';

export default {
  search,
  searchById
};

async function search(artistName) {
  try {
    let artist;

    artist = await spotifyCache.get(artistName);

    if (artist && artist.id) {
      console.log('CACHE: Spotify > Artist:', artistName);
      return Promise.resolve(artist);
    }

    let { artists } = await spotify.search('artist', { artist: artistName });

    artist = artists.items.find(artist => {
      return stringsMatch(artist.name, artistName);
    });

    if (artist) {
      const { id } = artist;

      spotifyCache.set(artistName, { id });
      return searchById(id);
    }

    return {};
  } catch (error) {
    return Promise.reject({ status: 500 });
  }
}

function searchById(id) {
  return spotify.get(`/artists/${id}`);
}
