import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeToken } from '../lib/spotify';
import { supabase } from '../lib/supabase';
import LoadingSpinner from './LoadingSpinner';
import { motion } from 'framer-motion';

const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Connecting to Spotify...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const authError = params.get('error');

        if (authError) {
          throw new Error(`Authorization error: ${authError}`);
        }

        if (!code) {
          throw new Error('No authorization code present');
        }

        setStatus('Exchanging authorization code...');
        const tokenData = await exchangeToken(code);
        
        if (!tokenData.access_token) {
          throw new Error('No access token received');
        }

        // Store tokens
        localStorage.setItem('spotify_token', tokenData.access_token);
        if (tokenData.refresh_token) {
          localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
        }
        
        setStatus('Fetching your Spotify profile...');
        const profileResponse = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`
          }
        });
        
        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user profile');
        }
        
        const profile = await profileResponse.json();
        
        // Handle Supabase integration
        if (supabase) {
          setStatus('Setting up your account...');
          const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('spotify_id', profile.id)
            .single();
          
          let userId;
          
          if (existingUser) {
            userId = existingUser.id;
          } else {
            const { data: newUser, error: createError } = await supabase
              .from('users')
              .insert({
                spotify_id: profile.id,
                display_name: profile.display_name || profile.id
              })
              .select()
              .single();
              
            if (createError) {
              throw new Error('Failed to create user account');
            }
            
            if (newUser) {
              userId = newUser.id;
            }
          }
          
          if (userId) {
            localStorage.setItem('user_id', userId);
          }
        } else {
          localStorage.setItem('user_id', profile.id);
        }
        
        setStatus('Redirecting to playlist selection...');
        navigate('/playlist-select', { replace: true });
        
      } catch (error) {
        console.error('Authentication error:', error);
        setError(error instanceof Error ? error.message : 'Authentication failed');
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 3000);
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
            <p className="text-gray-400">Redirecting you back home...</p>
          </motion.div>
        ) : (
          <>
            <LoadingSpinner />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-xl text-white"
            >
              {status}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-2 text-sm text-gray-400"
            >
              This will only take a moment...
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SpotifyCallback;