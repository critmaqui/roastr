import React from 'react';
import { motion } from 'framer-motion';

type FeatureCardProps = {
  emoji: string;
  title: string;
  description: string;
  index: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ emoji, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="feature-card bg-gray-900 p-6 rounded-lg transition-all duration-300 hover:shadow-glow-orange transform hover:-translate-y-2"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="text-4xl mb-4"
      >
        {emoji}
      </motion.div>
      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      emoji: '🎧',
      title: 'Spotify Connect',
      description: 'Easily connect your Spotify account and select any playlist to roast.'
    },
    {
      emoji: '🔥',
      title: 'Roast Generator',
      description: 'Our AI analyzes your music and delivers brutally honest, hilarious roasts.'
    },
    {
      emoji: '📱',
      title: 'Shareable Roasts',
      description: 'Get a custom link to share your roast on social media and with friends.'
    },
    {
      emoji: '📊',
      title: 'Roast History',
      description: 'Keep track of all your previously roasted playlists (coming soon).'
    },
    {
      emoji: '🏆',
      title: 'Leaderboard',
      description: 'See which playlists got roasted the hardest in our global rankings.'
    }
  ];

  return (
    <section id="features" className="bg-black py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent"
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white mb-12 text-center text-shadow"
        >
          Features
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index}
              emoji={feature.emoji}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features