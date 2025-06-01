import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface RoastEntry {
  id: string;
  playlist_name: string;
  roast_text: string;
  score: number;
  created_at: string;
}

const Leaderboard: React.FC = () => {
  const [roasts, setRoasts] = useState<RoastEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoasts = async () => {
      if (supabase) {
        const { data, error } = await supabase
          .from('roasts')
          .select('*')
          .order('score', { ascending: false })
          .limit(10);

        if (!error && data) {
          setRoasts(data);
        }
      } else {
        console.warn('Supabase not configured - Leaderboard will show demo data');
        // Set some demo data
        setRoasts([
          {
            id: '1',
            playlist_name: 'Demo Playlist',
            roast_text: 'This is a demo roast. Configure Supabase to see real roasts!',
            score: 95,
            created_at: new Date().toISOString()
          }
        ]);
      }
      setLoading(false);
    };

    fetchRoasts();
  }, []);

  const getFlameRating = (score: number) => {
    return '🔥'.repeat(Math.min(Math.ceil(score / 2), 5));
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <h2 className="text-4xl font-bold text-white mb-12 text-center text-shadow">
        Hall of Flames 🔥
      </h2>

      {loading ? (
        <div className="text-white text-center">Loading the sickest burns...</div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {roasts.map((roast, index) => (
            <motion.div
              key={roast.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg p-6 hover:shadow-glow-orange transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  #{index + 1} {roast.playlist_name}
                </h3>
                <span className="text-2xl">{getFlameRating(roast.score)}</span>
              </div>
              <p className="text-gray-300 italic">"{roast.roast_text}"</p>
              <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
                <span>{new Date(roast.created_at).toLocaleDateString()}</span>
                <button className="text-orange-500 hover:text-orange-400 transition-colors">
                  Share 🔗
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;