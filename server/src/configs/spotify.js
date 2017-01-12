export default {
  apiUrl: 'https://api.spotify.com/v1',
  authUrl: 'https://accounts.spotify.com/authorize',
  authParams: {
    appId: '295dcdb3d10e48449baad39cbbd07fe8',
    secretKey: '55796b5c34264d3abe57045b665d70eb',
    redirectUrl: 'http://localhost:3000/api/spotify/auth/handle-login',
    scopes: 'user-read-private playlist-modify-public'
  }
};
