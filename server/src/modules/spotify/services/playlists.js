import axios from 'axios';
import spotifyConfig from '../../../configs/spotify';
import authService from './auth';
import playlistQueue from '../jobs/playlist';

export default {
  create,
  addTracks
};

const { retryAttempts } = spotifyConfig;

async function create(params) {
  let { artists, tracks, name, userId, token, refresh, attempts = 1 } = params;

  try {
    if (!tracks && !artists) {
      throw { status: 400, message: 'Requires artist/tracks' };
    }

    const { id, uri } = await createPlaylist(name, userId, token);

    playlistQueue.addTracks({ id, artists, tracks, userId, token, refresh });

    return { id, uri, token, attempts };
  } catch (err) {
    // TODO: Make a function
    if (err.status === 401 && attempts <= retryAttempts) {
      try {
        let token = await authService.renewToken(refresh);
        attempts++;
        return create({ ...params, token, attempts });
      } catch (err) {
        throw { status: 401, message: 'Invalid Refresh token' };
      }
    } else {
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

async function addTracks(params) {
  let { id, userId, tracks, token, refresh, attempts = 1 } = params;

  try {
    const uris = Object.keys(tracks).map(track => {
      return `spotify:track:${tracks[track]}`;
    }).join(',');

    return playlistRequest({
      url: `${spotifyConfig.apiUrl}/users/${userId}/playlists/${id}/tracks`,
      params: { uris }
    }, token);
  } catch (err) {
    // TODO: Make a function
    if (err.status === 401 && attempts <= retryAttempts) {
      let token = await authService.renewToken(refresh);
      attempts++;

      return addTracks({ ...params, token, attempts });
    } else {
      throw err;
    }
  }
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
