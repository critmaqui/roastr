import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeToken } from '../lib/spotify';
import { supabase } from '../lib/supabase';

const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      exchangeToken(code).then(async (tokenData) => {
        // Store the access token
        localStorage.setItem('spotify_token', tokenData.access_token);
        
        // Optionally store refresh token if you want to implement token refresh
        if (tokenData.refresh_token) {
          localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
        }
        
        // Fetch user profile from Spotify
        const profileResponse = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`
          }
        });
        
        const profile = await profileResponse.json();
        
        // Check if user exists in Supabase (only if Supabase is configured)
        if (supabase) {
          const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('spotify_id', profile.id)
            .single();
          
          let userId;
          
          if (existingUser) {
            userId = existingUser.id;
          } else {
            // Create new user
            const { data: newUser, error } = await supabase
              .from('users')
              .insert({
                spotify_id: profile.id,
                display_name: profile.display_name || profile.id
              })
              .select()
              .single();
              
            if (!error && newUser) {
              userId = newUser.id;
            }
          }
          
          // Store user ID in localStorage for later use
          if (userId) {
            localStorage.setItem('user_id', userId);
          }
        } else {
          // If Supabase is not configured, just store Spotify ID as user ID
          localStorage.setItem('user_id', profile.id);
          console.warn('Supabase not configured - using Spotify ID as user ID');
        }
        
        navigate('/playlist-select');
      }).catch((error: Error) => {
        console.error('Error exchanging code for token:', error);
        navigate('/');
      });
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p>Connecting to Spotify...</p>
      </div>
    </div>
  );
};

export default SpotifyCallback;