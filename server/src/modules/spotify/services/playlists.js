import tracksService from './tracks';

export default {
  create
};

async function create(artist, tracks) {
  try {
    let artistTracks;

    if (artist && tracks) {
      artistTracks = await tracksService.getAll(tracks, artist);
    } else if (artist) {
      artistTracks = await tracksService.getByArtist(artist);
    }

    return Promise.resolve(artistTracks);
  } catch (error) {
    return Promise.reject(error);
  }
}
