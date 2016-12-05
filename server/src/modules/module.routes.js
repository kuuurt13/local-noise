import artists from './spotify/controllers/artists';
import tracks from './spotify/controllers/tracks';
import playlists from './spotify/controllers/playlists';

export default [
  {
    url: '/spotify',
    routes: [
      artists,
      tracks,
      playlists
    ]
  }
];
