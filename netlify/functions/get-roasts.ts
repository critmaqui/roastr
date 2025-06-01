import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export const handler: Handler = async (event) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const params = event.queryStringParameters || {};
    const { limit = '10', offset = '0', userId } = params;

    let query = supabase
      .from('roasts')
      .select(`
        *,
        playlists (
          name,
          spotify_id,
          users (
            display_name
          )
        )
      `)
      .order('created_at', { ascending: false })
      .limit(Number(limit))
      .range(Number(offset), Number(offset) + Number(limit) - 1);

    // If userId is provided, filter by user
    if (userId) {
      query = query.eq('playlists.user_id', userId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching roasts:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to fetch roasts' }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ roasts: data }),
    };

  } catch (error) {
    console.error('Error in get-roasts:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
}; 