import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Zap, Share2, History, Shield, Sparkles } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Headphones className="w-12 h-12" />,
      title: 'Spotify Connect',
      description: 'Link your account. Select playlist. Get destroyed.',
      color: 'from-spotify-green to-green-400',
      emoji: '🎧',
      rotation: -3,
      spotlight: true
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'AI Roasts',
      description: 'Our AI goes harder than your ex\'s subtweets.',
      color: 'from-orange-neon to-pink-neon',
      emoji: '🔥',
      rotation: 2
    },
    {
      icon: <Share2 className="w-12 h-12" />,
      title: 'Share the L',
      description: 'Post your roast. Watch friends unfollow.',
      color: 'from-blue-neon to-purple-neon',
      emoji: '📱',
      rotation: -2
    },
    {
      icon: <History className="w-12 h-12" />,
      title: 'Roast Archive',
      description: 'Relive the trauma whenever you want.',
      color: 'from-purple-neon to-pink-neon',
      emoji: '📚',
      rotation: 3
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: 'Leaderboard',
      description: 'See who has the worst taste globally.',
      color: 'from-yellow-500 to-orange-neon',
      emoji: '🏆',
      rotation: -1
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Privacy First',
      description: 'Your data\'s safe. Your taste isn\'t.',
      color: 'from-gray-500 to-gray-600',
      emoji: '🔒',
      rotation: 1
    }
  ];

  return (
    <section id="features" className="bg-black py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="noise-overlay" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.6, 0.01, 0.2, 0.95] }}
          className="mb-20"
        >
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl text-center mb-6">
            <span className="block gradient-text-multi animate-gradient-shift">FEATURES</span>
            <span className="block text-white text-3xl md:text-4xl font-body font-normal mt-4">
              that actually <span className="cutout-text">SLAP</span>
            </span>
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group h-full"
              initial={{ opacity: 0, y: 50, rotate: feature.rotation }}
              whileInView={{ opacity: 1, y: 0, rotate: feature.rotation }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                rotate: 0,
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className={`bg-black border-2 ${feature.spotlight ? 'border-spotify-green' : 'border-gray-800'} p-8 lg:p-10 h-full hover:border-orange-neon/50 transition-all duration-300 relative overflow-hidden`}>
                {/* Spotify logo watermark for Spotify Connect */}
                {feature.spotlight && (
                  <motion.div
                    className="absolute -bottom-10 -right-10 opacity-10"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 30,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <svg
                      width="150"
                      height="150"
                      viewBox="0 0 168 168"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#1ED760"
                        d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
                      />
                    </svg>
                  </motion.div>
                )}

                {/* Emoji in corner */}
                <motion.div
                  className="absolute top-6 right-6 text-4xl opacity-20 group-hover:opacity-40 transition-opacity"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {feature.emoji}
                </motion.div>

                <div className="relative mb-6">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300 ${feature.spotlight ? 'shadow-glow-spotify' : ''}`}>
                    {feature.icon}
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  />
                  {/* Special badge for Spotify Connect */}
                  {feature.spotlight && (
                    <motion.div
                      className="absolute -top-2 -right-2 bg-spotify-green text-black px-2 py-1 rounded-full text-xs font-bold"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      OFFICIAL
                    </motion.div>
                  )}
                </div>

                <h3 className="font-display text-3xl mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-400 font-body text-lg leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-6xl font-display"
                  >
                    ✦
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="font-body text-gray-500 uppercase tracking-[0.3em] text-sm">
            Built different • No 🧢 • Actually works
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;