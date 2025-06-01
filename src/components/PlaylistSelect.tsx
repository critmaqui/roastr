import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSpotifyPlaylists, getPlaylistTracks } from '../lib/spotify';
import { supabase } from '../lib/supabase';

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
}

const PlaylistSelect: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [roasting, setRoasting] = useState(false);
  const [roast, setRoast] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('spotify_token');
    if (token) {
      getSpotifyPlaylists(token).then((data) => {
        setPlaylists(data.items);
        setLoading(false);
      });
    }
  }, []);

  const generateRoast = async (playlistId: string) => {
    setRoasting(true);
    const token = localStorage.getItem('spotify_token');
    
    try {
      const tracksData = await getPlaylistTracks(token!, playlistId);
      const trackNames = tracksData.items.map((item: any) => item.track.name);
      
      const response = await fetch('/api/generate-roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tracks: trackNames }),
      });
      
      const { roast } = await response.json();
      setRoast(roast);
      
      await supabase.from('roasts').insert({
        playlist_id: playlistId,
        roast_text: roast,
        created_at: new Date(),
      });
    } catch (error) {
      console.error('Error generating roast:', error);
    } finally {
      setRoasting(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-white mb-8 text-center text-shadow"
      >
        Select a Playlist to Roast
      </motion.h2>
      
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          Loading your playlists...
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {playlists.map((playlist) => (
            <motion.div
              key={playlist.id}
              variants={item}
              className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-glow-orange transition-all duration-300 transform hover:-translate-y-2"
            >
              <motion.img 
                src={playlist.images[0]?.url} 
                alt={playlist.name}
                className="w-full h-48 object-cover"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="p-4">
                <h3 className="text-white font-bold mb-2">{playlist.name}</h3>
                <motion.button
                  onClick={() => generateRoast(playlist.id)}
                  className="w-full py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={roasting}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span className="animate-pulse">🔥</span>
                    {roasting ? 'Roasting...' : 'Roast This'}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {roast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-glow-orange"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Your Roast:</h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg italic"
          >
            "{roast}"
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default PlaylistSelect