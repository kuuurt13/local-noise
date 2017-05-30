import Queue from 'bull';
import { queueIp, queuePort } from '../../../configs/app';
import tracksService from '../services/tracks';
import playlistService from '../services/playlists';
import authService from '../services/auth';

let addTracksQueue = Queue('Add Tracks To Playlist', queuePort, queueIp);
addTracksQueue.process(addTracksToPlaylist);

export default {
  addTracks: (data) => addTracksQueue.add(data)
};

async function addTracksToPlaylist(job, done) {
  console.log('JOB: SPOTIFY > Add tracks to playlist');
  let { id, tracks, artists, userId, token, refresh } = job.data;
  let artistTracks;

  try {
    token = await authService.renewToken(refresh);

    if (tracks) {
      artistTracks = await tracksService.getAllTracks({ tracks, token });
    } else if (artists) {
      artistTracks = await tracksService.getByArtists(artists, token);
    }

    const playlist = await playlistService.addTracks({
      id,
      userId,
      tracks: artistTracks,
      token,
      refresh
    });

    done(null, playlist);
  } catch (error) {
    console.log('JOB > SPOTIFY: ERROR: Add tracks to playlist', error);
    done();
  }
}
