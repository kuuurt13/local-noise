export default {
  apiUrl: 'https://api.spotify.com/v1',
  authUrl: 'https://accounts.spotify.com/authorize',
  tokenUrl: 'https://accounts.spotify.com/api/token',
  userUrl: 'https://api.spotify.com/v1/me',
  auth: {
    id: process.env.SPOTIFY_CLIENT_ID,
    secret: process.env.SPOTIFY_SECRET_KEY,
    redirectUrl: process.env.SPOTIFY_REDIRECT_URL,
    scopes: 'user-read-private playlist-modify-public'
  },
  retryAttempts: 1
};
