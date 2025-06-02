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
    console.error('Missing Spotify Client ID');
    return;
  }

  // Clear any existing tokens and state
  localStorage.removeItem('spotify_token');
  localStorage.removeItem('spotify_refresh_token');
  localStorage.removeItem('user_id');
  Cookies.remove('spotify_auth_state');

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
      body: JSON.stringify({ code }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to exchange token');
    }

    const data = await response.json();
    
    if (!data.access_token) {
      throw new Error('No access token received');
    }

    // Store both tokens
    localStorage.setItem('spotify_token', data.access_token);
    if (data.refresh_token) {
      localStorage.setItem('spotify_refresh_token', data.refresh_token);
    }

    return data;
  } catch (error) {
    console.error('Token exchange error:', error);
    throw error;
  }
};

export const refreshAccessToken = async () => {
  try {
    const refresh_token = localStorage.getItem('spotify_refresh_token');
    if (!refresh_token) {
      throw new Error('No refresh token available');
    }

    const response = await fetch('/.netlify/functions/refresh-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    
    if (!data.access_token) {
      throw new Error('No access token received from refresh');
    }

    // Update stored tokens
    localStorage.setItem('spotify_token', data.access_token);
    if (data.refresh_token) {
      localStorage.setItem('spotify_refresh_token', data.refresh_token);
    }

    return data.access_token;
  } catch (error) {
    console.error('Token refresh error:', error);
    // Clear tokens and redirect to login
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('spotify_refresh_token');
    window.location.href = '/';
    throw error;
  }
};

const handleSpotifyError = async (error: any, retryFn: () => Promise<any>) => {
  if (error.status === 401) {
    try {
      await refreshAccessToken();
      return await retryFn();
    } catch (refreshError) {
      throw refreshError;
    }
  }
  throw error;
};

export const getSpotifyPlaylists = async (token: string) => {
  const fetchPlaylists = async () => {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw { status: response.status, message: 'Failed to fetch playlists' };
    }

    return response.json();
  };

  try {
    return await fetchPlaylists();
  } catch (error: any) {
    return await handleSpotifyError(error, fetchPlaylists);
  }
};

export const getPlaylistTracks = async (token: string, playlistId: string) => {
  const fetchTracks = async () => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw { status: response.status, message: 'Failed to fetch tracks' };
    }

    return response.json();
  };

  try {
    return await fetchTracks();
  } catch (error: any) {
    return await handleSpotifyError(error, fetchTracks);
  }
};

export const getUserProfile = async (token: string) => {
  const fetchProfile = async () => {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw { status: response.status, message: 'Failed to fetch user profile' };
    }

    return response.json();
  };

  try {
    return await fetchProfile();
  } catch (error: any) {
    return await handleSpotifyError(error, fetchProfile);
  }
};