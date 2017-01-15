import axios from 'axios';
import spotifyConfig from '../../../configs/spotify';
import tracksService from './tracks';

export default {
  create
};

async function create({ artist, tracks, name, userId, token, refresh }) {
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

    return playlist;
  } catch (error) {
    throw error;
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
