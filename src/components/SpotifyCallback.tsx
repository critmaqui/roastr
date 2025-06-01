import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { exchangeToken } from '../lib/spotify';
import Cookies from 'js-cookie';

const SpotifyCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const storedState = Cookies.get('spotify_auth_state');

      if (!code) {
        setError('Authorization code not found');
        return;
      }

      if (state !== storedState) {
        setError('State mismatch');
        return;
      }

      try {
        const token = await exchangeToken(code);
        localStorage.setItem('spotify_token', token);
        Cookies.remove('spotify_auth_state');
        navigate('/playlist-select');
      } catch (err) {
        setError('Failed to authenticate with Spotify');
        console.error(err);
      }
    };

    handleCallback();
  }, [navigate, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-red-500 text-white p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <div className="text-white text-xl">Connecting to Spotify...</div>
      </div>
    </div>
  );
};

export default SpotifyCallback;