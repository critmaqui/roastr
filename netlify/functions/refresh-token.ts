import { Handler } from '@netlify/functions';

const CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_SPOTIFY_CLIENT_SECRET || process.env.SPOTIFY_CLIENT_SECRET;

export const handler: Handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { refresh_token } = JSON.parse(event.body || '{}');

    if (!refresh_token) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Refresh token required' }),
      };
    }

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error('Missing Spotify credentials');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Spotify token refresh error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to refresh token',
          details: errorData
        }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };

  } catch (error) {
    console.error('Error in token refresh:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};