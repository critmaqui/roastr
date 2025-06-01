import { Handler } from '@netlify/functions';

const CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || process.env.VITE_SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = process.env.VITE_SPOTIFY_REDIRECT_URI || process.env.SPOTIFY_REDIRECT_URI;

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
    const { code } = JSON.parse(event.body || '{}');

    if (!code) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Authorization code required' }),
      };
    }

    // Use the deployment URL or localhost for development
    const baseUrl = event.headers.host.includes('localhost') || event.headers.host.includes('127.0.0.1')
      ? `http://${event.headers.host}`
      : `https://${event.headers.host}`;

    const finalRedirectUri = REDIRECT_URI || `${baseUrl}/callback`;

    // Exchange code for access token
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: finalRedirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Token exchange error:', error);
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Failed to exchange token' }),
      };
    }

    const tokenData = await tokenResponse.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(tokenData),
    };

  } catch (error) {
    console.error('Error in token exchange:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};