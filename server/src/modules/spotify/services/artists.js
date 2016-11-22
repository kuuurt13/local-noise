import redis from '../../../shared/redis';
import stringsMatch from '../../../shared/stringsMatch';
import spotify from './search';

export async function artistSearch(artist) {
  try {
    let { artists } = await spotify.search('artist', { artist });
    let artist = artists.items.find(artist => {
      return stringsMatch(artist.name, artist);
    });

    if (artist) {
      const { id } = artist;

      redis.set(artist, { id });
      return artistById(id);
    }

    return Promise.reject({ status: 404 });
  } catch (error) {
    return Promise.reject({ status: 500 });
  }
}

export function artistById(id) {
  return spotify.get(`/artists/${id}`);
}

export function artistTracks(id) {
  return spotify.get(`/artists/${id}/tracks`);
}
