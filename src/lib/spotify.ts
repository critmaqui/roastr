import Cookies from 'js-cookie';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 
  window.location.origin + '/callback';
const SCOPES = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-read-private',
  'user-read-email'
];

export const loginWithSpotify = () => {
  if (!CLIENT_ID) {
    console.error('Spotify Client ID not found. Please check your environment variables.');
    alert('Configuration error. Please try again later.');
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
  window.location.href = authUrl;
};

export const exchangeToken = async (code: string) => {
  const response = await fetch('/.netlify/functions/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      code,
      redirect_uri: REDIRECT_URI
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to exchange token');
  }

  return response.json();
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