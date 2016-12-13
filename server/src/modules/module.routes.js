import artists from './spotify/controllers/artists';
import tracks from './spotify/controllers/tracks';
import playlists from './spotify/controllers/playlists';
import locations from './songkick/controllers/locations';

export default [
  {
    url: '/spotify',
    routes: [
      artists,
      tracks,
      playlists
    ]
  },
  {
    url: '/songkick',
    routes: [
      locations
    ]
  }
];
