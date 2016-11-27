import redis from '../../../shared/redis';
import stringsMatch from '../../../shared/stringsMatch';
import spotifySearch from './search';
import { artistSearch } from '../services/artists';


export async function artistTrackSearch(artistName, id) {
  try {
    let artist;

    if (!id) {
      artist = await artistSearch(artistName);

      if (!artist) {
        throw { status: 404 };
      }
    }

    const { tracks } = await getArtistTracksById(id || artist.id);

    const trackIds = tracks.map(track => track.id);
    redis.set(artistName, { id, trackIds });

    return Promise.resolve(trackIds);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function trackSearch(track, artist) {
  try {
    const { tracks } = await spotifySearch.search('tracks', { track, artist });

    let matchedTrack = tracks.items.find(item => {
      const { name, artists } = item;
      const isMatch = stringsMatch(name, track);

      return isMatch && artist ? hasArtist(artist, artists) : isMatch;
    });

    return Promise.resolve({
      track: matchedTrack,
      results: tracks.items
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export function getArtistTracksById(id) {
  return spotifySearch.get(`/artists/${id}/top-tracks`, { country: 'US' });
}

// Private Methods
function hasArtist(artistName, artists) {
  return artists.some(artist => stringsMatch(artist.name, artistName));
}
