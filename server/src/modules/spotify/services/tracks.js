import redis from '../../../shared/redis';
import spotifySearch from './search';
import { artistSearch } from '../services/artists';

import spotify from './search';

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

export function getArtistTracksById(id) {
  return spotifySearch.get(`/artists/${id}/top-tracks`, { country: 'US' });
}
