import tracksService from './tracks';

export default {
  create
};

async function create(artist, tracks) {
  try {
    let artistTracks;

    if (tracks) {
      artistTracks = await tracksService.getAll(tracks, artist);
      return artistTracks;
    } else if (artist) {
      artistTracks = await tracksService.getByArtist(artist);
      return artistTracks;
    }

    // TODO: Add playlist create

    throw Error({ status: 400, message: 'Requires artist and/or tracks' });
  } catch (error) {
    return Promise.reject(error);
  }
}
