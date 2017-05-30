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

async function getTrack({ track, artist, token, ignoreCache }) {
  try {
    if (!ignoreCache) {
      let { tracks } = await artistsService.search(artist, token);

      if (tracks && tracks[track]) {
        console.log('CACHE: Spotify > Track:', track);
        return mapTrack(track, tracks[track]);
      }
    }

    const { tracks = { items: [] } } = await spotify.search('tracks', { track, artist, token });

    const { name, id } = tracks.items.find(item => {
      const { name, artists } = item;
      return !track ? hasArtist(artist, artists) : stringsMatch(name, track);
    }) || {};

    if (name && id) {
      spotifyCache.set(artist, {
        id,
        ...mapTrack(track || name, id)
      });

      return mapTrack(track || name, id);
    }

    return {};
  } catch (error) {
    throw error;
  }
}

async function getAllTracks({ tracks, artistName, token }) {
  try {
    const requests = tracks.map(track => {
      return getTrack({
        track: track.name || track,
        artist: track.artist || artistName,
        token
      });
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

async function getByArtist({ name, id, token }) {
  try {
    let artist;

    if (!id) {
      artist = await spotifyCache.get(name);
    }

    const { id = artist.id, tracks } = artist || {};

    if (!id && !Object.keys(tracks).length) {
      return getTrack({ artist: name, token, ignoreCache: true });
    }

    if (tracks) {
      console.log('CACHE: Spotify > Artist Tracks:', name);
      return tracks;
    }

    console.log('getTracksByArtistId', token);
    const { tracks: artistTracks } = await getTracksByArtistId(id, token);

    const mappedTracks = artistTracks.reduce((tracks, track) => {
      tracks[track.name] = track.id;
      return tracks;
    }, {});

    spotifyCache.set(name, {
      id,
      ...mappedTracks
    });

    return mappedTracks;
  } catch (error) {
    throw error;
  }
}

async function getByArtists(artists, token) {
  if (!artists) {
    throw { error: 400, message: 'Requires artists' };
  }

  const tracks = await Promise.all(
    artists.map(artist => {
      return getByArtist({ name: artist, token });
    })
  );

  return tracks.reduce((tracks, track) => {
    return { ...track, ...tracks };
  }, {});
}

function mapTrack(name, id) {
  return { [name]: id };
}

function getTracksByArtistId(id, token) {
  return spotify.get(`/artists/${id}/top-tracks`, { country: 'US' }, token);
}

function hasArtist(artistName, artists) {
  return artists.some(artist => stringsMatch(artist.name, artistName));
}
