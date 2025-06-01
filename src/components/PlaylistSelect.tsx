import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSpotifyPlaylists, getPlaylistTracks } from '../lib/spotify';
import { supabase } from '../lib/supabase';
import TypewriterComponent from 'typewriter-effect';
import LoadingSpinner from './LoadingSpinner';
import SpotifyBadge from './SpotifyBadge';
import { Music, Disc3, Users } from 'lucide-react';

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

  const generateRoast = async (playlistId: string, playlistName: string) => {
    setRoasting(true);
    const token = localStorage.getItem('spotify_token');
    
    try {
      const tracksData = await getPlaylistTracks(token!, playlistId);
      const tracks = tracksData.items.map((item: any) => {
        const track = item.track;
        return `${track.name} by ${track.artists.map((a: any) => a.name).join(', ')}`;
      });
      
      // First, check if playlist exists in Supabase, if not create it
      if (supabase) {
        const { data: existingPlaylist } = await supabase
          .from('playlists')
          .select('id')
          .eq('spotify_id', playlistId)
          .single();
          
        let dbPlaylistId = existingPlaylist?.id;
        
        if (!existingPlaylist) {
          // Get user data (you might need to store this during auth)
          const userId = localStorage.getItem('user_id'); // Assumes you store this during auth
          
          if (userId) {
            const { data: newPlaylist, error: playlistError } = await supabase
              .from('playlists')
              .insert({
                spotify_id: playlistId,
                name: playlistName,
                user_id: userId
              })
              .select()
              .single();
            
            if (!playlistError && newPlaylist) {
              dbPlaylistId = newPlaylist.id;
            }
          }
        }
        
        const response = await fetch('/.netlify/functions/generate-roast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            tracks,
            playlistName,
            playlistId: dbPlaylistId
          }),
        });
        
        const { roast } = await response.json();
        setRoast(roast);
      } else {
        // If Supabase is not configured, just call the API without database ID
        const response = await fetch('/.netlify/functions/generate-roast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            tracks,
            playlistName,
            playlistId: null
          }),
        });
        
        const { roast } = await response.json();
        setRoast(roast);
      }
    } catch (error) {
      console.error('Error generating roast:', error);
      setRoast("Something went wrong while roasting your playlist. Even our AI couldn't handle your music taste! 🔥");
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
    <div className="min-h-screen bg-black p-8 relative overflow-hidden">
      {/* Background Spotify logo */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg
          width="400"
          height="400"
          viewBox="0 0 168 168"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#1ED760"
            d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
          />
        </svg>
      </motion.div>

      {/* Spotify Badge in corner */}
      <motion.div
        className="absolute top-8 right-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <SpotifyBadge size="sm" animated={true} showText={true} />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {!roasting && !roast && (
          <>
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-6xl md:text-8xl text-center mb-12"
            >
              <span className="text-white">SELECT YOUR</span>
              <br />
              <span className="gradient-text-multi animate-gradient-shift">VICTIM PLAYLIST</span>
            </motion.h2>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-8 mb-8"
            >
              <div className="flex items-center gap-2 text-gray-400">
                <Music className="w-5 h-5 text-spotify-green" />
                <span>{playlists.length} Playlists</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Disc3 className="w-5 h-5 text-spotify-green" />
                <span>Ready to roast</span>
              </div>
            </motion.div>
            
            {loading ? (
              <LoadingSpinner message="Loading your Spotify playlists..." />
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {playlists.map((playlist) => (
                  <motion.div
                    key={playlist.id}
                    variants={item}
                    className="group relative bg-gray-900 rounded-xl overflow-hidden hover:shadow-glow-spotify transition-all duration-300 transform hover:-translate-y-2 border border-gray-800 hover:border-spotify-green"
                  >
                    {/* Spotify badge on playlist */}
                    <div className="absolute top-2 left-2 z-10 bg-black/80 rounded-full p-1">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 168 168"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#1ED760"
                          d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
                        />
                      </svg>
                    </div>

                    <motion.img
                      src={playlist.images[0]?.url || '/placeholder.jpg'}
                      alt={playlist.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      whileHover={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="p-6">
                      <h3 className="font-display text-xl mb-2 text-white">{playlist.name}</h3>
                      <motion.button
                        onClick={() => generateRoast(playlist.id, playlist.name)}
                        className="w-full py-3 bg-gradient-to-r from-spotify-green to-green-400 text-black rounded-full hover:shadow-glow-spotify transition-all relative overflow-hidden group font-bold uppercase tracking-wider"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>Roast This</span>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="inline-block"
                          >
                            🔥
                          </motion.span>
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-orange-neon to-pink-neon"
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}

        {roasting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 max-w-2xl mx-auto bg-gray-900 p-6 rounded-lg shadow-glow-orange"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Your Roast:</h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300 text-lg italic"
            >
              <TypewriterComponent
                options={{
                  strings: [roast],
                  autoStart: true,
                  delay: 50,
                  cursor: '',
                }}
              />
            </motion.div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => {
                navigator.clipboard.writeText(roast);
                alert('Roast copied to clipboard!');
              }}
              className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Share Roast 📋
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PlaylistSelect