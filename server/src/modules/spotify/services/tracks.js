import redis from '../../../shared/redis';
import stringsMatch from '../../../shared/stringsMatch';
import spotify from './search';
import artistsService from '../services/artists';

export default {
  get,
  getAll,
  getByArtist
};

async function get(track, artist, ignoreCache) {
  try {
    let mappedTrack = {};

    if (!ignoreCache) {
      let { tracks: artistTracks } = await artistsService.search(artist);

      if (artistTracks && artistTracks[track]) {
        mappedTrack[track] = artistTracks[track];
        return Promise.resolve(mappedTrack);
      }
    }

    const { tracks } = await spotify.search('tracks', { track, artist });

    let matchedTrack = tracks.items.find(item => {
      const { name, artists } = item;
      const isMatch = stringsMatch(name, track);

      return isMatch && artist ? hasArtist(artist, artists) : isMatch;
    });

    mappedTrack[track] = matchedTrack.id;
    return Promise.resolve(mappedTrack);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getAll(tracks, artistName) {
  try {
    const requests = tracks.map(track => get(track, artistName));

    //TODO: Clean up
    return Promise.all(requests).then(tracks => {
      return tracks.reduce((tracks, track) => {
        let keys = Object.keys(track);
        tracks[keys[0]] = track[keys];
        return tracks;
      }, {});
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getByArtist(artistName, id) {
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
  return spotify.get(`/artists/${id}/top-tracks`, { country: 'US' });
}

function hasArtist(artistName, artists) {
  return artists.some(artist => stringsMatch(artist.name, artistName));
}
