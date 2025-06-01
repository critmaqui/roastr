import Cookies from 'js-cookie';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 
  'https://getroasted.me/callback';
const SCOPES = [
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-read-private',
  'user-read-email'
];

export const loginWithSpotify = () => {
  if (!CLIENT_ID) {
    console.error('Missing Spotify Client ID');
    return;
  }

  // Clear any existing tokens
  localStorage.removeItem('spotify_token');
  localStorage.removeItem('spotify_refresh_token');
  localStorage.removeItem('user_id');

  const state = Math.random().toString(36).substring(7);
  Cookies.set('spotify_auth_state', state);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
    state: state,
    show_dialog: 'true' // Force showing the auth dialog
  });

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  window.location.href = authUrl;
};

export const exchangeToken = async (code: string) => {
  try {
    const response = await fetch('/.netlify/functions/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        code,
        redirect_uri: REDIRECT_URI
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Token exchange error details:', errorData);
      throw new Error(`Token exchange failed: ${errorData.error}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Token exchange error:', error);
    throw error;
  }
};

export const getSpotifyPlaylists = async (token: string) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlists');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
};

export const getPlaylistTracks = async (token: string, playlistId: string) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tracks');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching tracks:', error);
    throw error;
  }
};

export const getUserProfile = async (token: string) => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};