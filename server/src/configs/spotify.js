export default {
  apiUrl: 'https://api.spotify.com/v1',
  authUrl: 'https://accounts.spotify.com/authorize',
  tokenUrl: 'https://accounts.spotify.com/api/token',
  userUrl: 'https://api.spotify.com/v1/me',
  auth: {
    id: '295dcdb3d10e48449baad39cbbd07fe8',
    secret: '55796b5c34264d3abe57045b665d70eb',
    redirectUrl: process.env.SPOTIFY_REDIRECT_URL,
    scopes: 'user-read-private playlist-modify-public'
  },
  retryAttempts: 1
};
