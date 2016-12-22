import stringsMatch from '../../../shared/stringsMatch';
import spotifyCache from '../services/cache';
import artistsService from '../services/artists';
import spotify from './search';


export default {
  get,
  getAll,
  getByArtist,
  mapTrack
};

async function get(track, artist, ignoreCache) {
  try {
    if (!ignoreCache) {
      let { tracks } = await artistsService.search(artist);

      if (tracks && tracks[track]) {
        console.log('CACHE: Spotify > Track:', track);
        return Promise.resolve(mapTrack(track, tracks[track]));
      }
    }

    const { tracks } = await spotify.search('tracks', { track, artist });

    let matchedTrack = tracks.items.find(item => {
      const { name, artists } = item;
      const isMatch = stringsMatch(name, track);

      return isMatch && artist ? hasArtist(artist, artists) : isMatch;
    });

    spotifyCache.set(artist, mapTrack(track, matchedTrack.id));

    return Promise.resolve(mapTrack(track, matchedTrack.id));
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getAll(tracks, artistName) {
  try {
    const requests = tracks.map(track => {
      return get(track.name || track, track.artist || artistName);
    });

    let resps = await Promise.all(requests);

    resps = resps.reduce((tracks, track) => {
      return Object.assign(tracks, track);
    }, {});

    return Promise.resolve(resps);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function getByArtist(artistName, id) {
  try {
    let artist;

    if (!id) {
      artist = await spotifyCache.get(artistName);

      if (!artist.id) {
        artist = await artistsService.search(artistName);
      }
    }

    const { id = artist.id, tracks } = artist || {};

    if (!id && !tracks) {
      throw Error({ status: 404, message: 'Artist not found' });
    }

    if (tracks) {
      console.log('CACHE: Spotify > Artist Tracks:', artistName);
      return tracks;
    }

    const { tracks: artistTracks } = await getTracksByArtistId(id);

    const mappedTracks = artistTracks.reduce((tracks, track) => {
      tracks[track.name] = track.id;
      return tracks;
    }, {});

    spotifyCache.set(artistName, {
      id,
      ...mappedTracks
    });

    return Promise.resolve(mappedTracks);
  } catch (error) {
    return Promise.reject(error);
  }
}

function mapTrack(name, id) {
  let track = {};
  track[name] = id;
  return track;
}

function getTracksByArtistId(id) {
  return spotify.get(`/artists/${id}/top-tracks`, { country: 'US' });
}

function hasArtist(artistName, artists) {
  return artists.some(artist => stringsMatch(artist.name, artistName));
}
