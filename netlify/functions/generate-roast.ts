import { Handler } from '@netlify/functions';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase with service role key for admin access
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: false
    }
  }
);

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
    const { tracks, playlistName, playlistId } = JSON.parse(event.body || '{}');

    // Validate input
    if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid tracks data' }),
      };
    }

    // Generate roast prompt
    const trackList = tracks.slice(0, 20).join(', ');
    const prompt = `You are a savage Gen Z music critic. Roast this Spotify playlist "${playlistName || 'Untitled'}" based on these tracks: ${trackList}. 

Make it funny, brutally honest, and use Gen Z slang. The roast should be 2-3 sentences max, hitting hard on their music taste. Be creative and reference specific artists or songs. End with a fire emoji.`;

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a hilarious, savage music critic who roasts people's playlists in Gen Z style."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 150,
      temperature: 0.9,
    });

    const roast = completion.choices[0]?.message?.content || "Your music taste broke our AI. That's the real roast. 🔥";

    // Save to Supabase if we have the playlist ID
    if (playlistId) {
      const { error: insertError } = await supabase
        .from('roasts')
        .insert({
          playlist_id: playlistId,
          roast_text: roast,
          score: Math.floor(Math.random() * 100),
        });

      if (insertError) {
        console.error('Error saving roast to Supabase:', insertError);
      }
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ roast }),
    };

  } catch (error) {
    console.error('Error generating roast:', error);
    
    const fallbackRoasts = [
      "Your playlist is so mid, even elevator music is jealous. 🔥",
      "This playlist screams 'I peaked in high school'. No cap. 🔥",
      "Tell me you have no aux privileges without telling me... oh wait, you just did. 🔥",
      "Spotify should charge YOU for hosting this playlist. It's giving NPC energy. 🔥"
    ];
    
    const fallbackRoast = fallbackRoasts[Math.floor(Math.random() * fallbackRoasts.length)];
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ roast: fallbackRoast }),
    };
  }
};