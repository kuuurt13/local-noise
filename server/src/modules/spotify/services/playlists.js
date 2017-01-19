import axios from 'axios';
import spotifyConfig from '../../../configs/spotify';
import tracksService from './tracks';
import authService from './auth';

export default {
  create
};

const { retryAttempts } = spotifyConfig;

async function create(params) {
  let { artist, tracks, name, userId, token, refresh, attempts = 1 } = params;

  try {
    let artistTracks;

    if (!tracks) {
      throw { status: 400, message: 'Requires tracks' };
    }

    if (tracks) {
      artistTracks = await tracksService.getAll(tracks, artist);
    } else if (artist) {
      artistTracks = await tracksService.getByArtist(artist);
    }

    const { id } = await createPlaylist(name, userId, token);
    const playlist = await addTracksToPlaylist(id, userId, artistTracks, token);

    return { playlist, token, attempts };
  } catch (err) {
    if (err.status === 401 && attempts <= retryAttempts) {
      let token = await authService.renewToken(refresh);
      attempts++;

      return create({ ...params, token, attempts });
    } else {
      console.log('err', err);
      throw err;
    }
  }
}

async function createPlaylist(name = 'Concert Playlist', userId, token) {
  if (!userId || !token) {
    // TODO: Research throwing error issue
    throw { status: 400, message: 'Requires user userId and token' };
  }

  return playlistRequest({
    url: `${spotifyConfig.apiUrl}/users/${userId}/playlists`,
    data: { name }
  }, token);
}

async function addTracksToPlaylist(id, userId, tracks, token) {
  const uris = Object.keys(tracks).map(track => {
    return `spotify:track:${tracks[track]}`;
  }).join(',');

  return playlistRequest({
    url: `${spotifyConfig.apiUrl}/users/${userId}/playlists/${id}/tracks`,
    params: { uris }
  }, token);
}

async function playlistRequest(params, token) {
  try {
    let defaults = {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      json: true
    };

    const { data } = await axios({ ...defaults, ...params });

    return data;
  } catch (error) {
    const { status, data: message } = error.response;
    throw { status, message };
  }
}
