import tracksService from './tracks';

export default {
  create
};

async function create(artist, tracks) {
  try {
    let artistTracks;

    if (tracks) {
      artistTracks = await tracksService.getAll(tracks, artist);
    } else if (artist) {
      artistTracks = await tracksService.getByArtist(artist);
    } else {
      throw Error({ status: 400, message: 'Requires artist and/or tracks' })
    }

    return Promise.resolve(artistTracks);
  } catch (error) {
    return Promise.reject(error);
  }
}
