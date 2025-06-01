import Cookies from 'js-cookie';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
// Use IP address instead of localhost to comply with Spotify's new requirements
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 
  window.location.origin.replace('localhost', '127.0.0.1') + '/callback';
const SCOPES = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-read-private',
  'user-read-email'
];

export const loginWithSpotify = () => {
  console.log('CLIENT_ID:', CLIENT_ID);
  console.log('REDIRECT_URI:', REDIRECT_URI);
  console.log('Environment variables:', import.meta.env);
  
  // Check if user is accessing via localhost and warn them
  if (window.location.hostname === 'localhost') {
    alert('⚠️ Spotify requires using 127.0.0.1 instead of localhost. Please access the app via http://127.0.0.1:' + window.location.port);
    console.error('Spotify no longer allows localhost in redirect URIs. Please use http://127.0.0.1:' + window.location.port + ' instead.');
    return;
  }
  
  if (!CLIENT_ID || CLIENT_ID === 'undefined' || CLIENT_ID.includes('spotify_client_id')) {
    alert('Spotify Client ID is not configured correctly. Please add VITE_SPOTIFY_CLIENT_ID to your .env file.');
    console.error('Invalid VITE_SPOTIFY_CLIENT_ID:', CLIENT_ID);
    console.error('Make sure to create a .env file in the root directory with: VITE_SPOTIFY_CLIENT_ID=your_actual_client_id');
    return;
  }

  const state = Math.random().toString(36).substring(7);
  Cookies.set('spotify_auth_state', state);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
    state: state,
  });

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  console.log('Redirecting to:', authUrl);
  window.location.href = authUrl;
};

export const exchangeToken = async (code: string) => {
  const redirect_uri = window.location.origin.replace('localhost', '127.0.0.1') + '/callback';
  const response = await fetch('/.netlify/functions/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, redirect_uri }),
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error('Token exchange failed:', error);
    throw new Error('Failed to exchange token');
  }

  const data = await response.json();
  return data;
};

export const getSpotifyPlaylists = async (token: string) => {
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch playlists');
  }

  return response.json();
};

export const getPlaylistTracks = async (token: string, playlistId: string) => {
  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tracks');
  }

  return response.json();
};

export const getUserProfile = async (token: string) => {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};