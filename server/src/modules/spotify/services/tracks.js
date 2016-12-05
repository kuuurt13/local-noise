import redis from '../../../shared/redis';
import stringsMatch from '../../../shared/stringsMatch';
import spotifySearch from './search';
import artistsService from '../services/artists';

export default {
  search,
  searchByArtist
};

async function search(track, artist) {
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

async function searchByArtist(artistName, id) {
  try {
    let artist;

    if (!id) {
      artist = await redis.get(artistName);

      if (!artist) {
        artist = await artistService.search(artistName);
      }
    }

    if (artist.tracks) {
      return Promise.resolve(artist.tracks);
    }

    const { tracks } = await getArtistTracksById(id || artist.id);

    const mappedTracks = tracks.reduce((tracks, track) => {
      tracks[track.name] = track.id;
      return tracks;
    }, {});

    redis.set(artistName, {
      id: id || artist.id,
      tracks: mappedTracks
    });

    return Promise.resolve(mappedTracks);
  } catch (error) {
    return Promise.reject(error);
  }
}

function getArtistTracksById(id) {
  return spotifySearch.get(`/artists/${id}/top-tracks`, { country: 'US' });
}

function hasArtist(artistName, artists) {
  return artists.some(artist => stringsMatch(artist.name, artistName));
}
