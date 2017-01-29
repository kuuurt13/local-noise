import stringsMatch from '../../../shared/stringsMatch';
import spotifyCache from '../services/cache';
import artistsService from '../services/artists';
import spotify from './search';


export default {
  getTrack,
  getAllTracks,
  getByArtist,
  getByArtists,
  mapTrack
};

async function getTrack(track, artist, ignoreCache) {
  try {
    if (!ignoreCache) {
      let { tracks } = await artistsService.search(artist);

      if (tracks && tracks[track]) {
        console.log('CACHE: Spotify > Track:', track);
        return mapTrack(track, tracks[track]);
      }
    }

    const { tracks } = await spotify.search('tracks', { track, artist });

    let matchedTrack = tracks.items.find(item => {
      const { name, artists } = item;
      const isMatch = stringsMatch(name, track);

      return isMatch && artist ? hasArtist(artist, artists) : isMatch;
    });

    spotifyCache.set(artist, mapTrack(track, matchedTrack.id));

    return mapTrack(track, matchedTrack.id);
  } catch (error) {
    throw error;
  }
}

async function getAllTracks(tracks, artistName) {
  try {
    const requests = tracks.map(track => {
      return getTrack(track.name || track, track.artist || artistName);
    });

    let resps = await Promise.all(requests);

    resps = resps.reduce((tracks, track) => {
      return Object.assign(tracks, track);
    }, {});

    return resps;
  } catch (error) {
    throw error;
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
      return {};
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

    return mappedTracks;
  } catch (error) {
    throw error;
  }
}

async function getByArtists(artists) {
  if (!artists) {
    throw { error: 400, message: 'Requires artists' };
  }

  const tracks = await Promise.all(artists.map(artist => getByArtist(artist)));
  return tracks.reduce((tracks, track) => {
    return { ...track, ...tracks };
  }, {});
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
