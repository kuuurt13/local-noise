import artists from './spotify/controllers/artists';
import tracks from './spotify/controllers/tracks';
import playlists from './spotify/controllers/playlists';
import auth from './spotify/controllers/auth';
import locations from './songkick/controllers/locations';
import concerts from './songkick/controllers/concerts';
import skArtists from './songkick/controllers/artists';
import setlists from './setlistfm/controllers/setlists';

export default [
  {
    url: '/spotify',
    routes: [
      artists,
      tracks,
      playlists,
      auth
    ]
  },
  {
    url: '/songkick',
    routes: [
      locations,
      concerts,
      skArtists
    ]
  },
  {
    url: '/setlistfm',
    routes: [
      setlists
    ]
  }
];
