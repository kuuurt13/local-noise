import artists from './spotify/controllers/artists';
import tracks from './spotify/controllers/tracks';
import playlists from './spotify/controllers/playlists';
import locations from './songkick/controllers/locations';
import concerts from './songkick/controllers/concerts';

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
      locations,
      concerts
    ]
  }
];
