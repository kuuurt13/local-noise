import artists from './spotify/controllers/artists';
import tracks from './spotify/controllers/tracks';

export default [
  {
    url: '/spotify',
    routes: [
      artists,
      tracks
    ]
  }
];
