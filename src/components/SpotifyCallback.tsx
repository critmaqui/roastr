import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeToken } from '../lib/spotify';
import { supabase } from '../lib/supabase';
import LoadingSpinner from './LoadingSpinner';

const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const error = params.get('error');

        if (error) {
          console.error('Authorization error:', error);
          navigate('/', { replace: true });
          return;
        }

        if (!code) {
          console.error('No authorization code present');
          navigate('/', { replace: true });
          return;
        }

        const tokenData = await exchangeToken(code);
        
        // Store the access token
        localStorage.setItem('spotify_token', tokenData.access_token);
        
        // Store refresh token if provided
        if (tokenData.refresh_token) {
          localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
        }
        
        // Fetch user profile from Spotify
        const profileResponse = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`
          }
        });
        
        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user profile');
        }
        
        const profile = await profileResponse.json();
        
        // Handle Supabase user creation/update if configured
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
          
          if (userId) {
            localStorage.setItem('user_id', userId);
          }
        } else {
          localStorage.setItem('user_id', profile.id);
        }
        
        // Redirect to playlist selection
        navigate('/playlist-select', { replace: true });
        
      } catch (error) {
        console.error('Error during authentication:', error);
        navigate('/', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <LoadingSpinner message="Connecting to Spotify..." />
    </div>
  );
};

export default SpotifyCallback;