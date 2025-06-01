import React from 'react';
import { motion } from 'framer-motion';

const RoastExamples: React.FC = () => {
  const roasts = [
    {
      playlist: "Gym Motivation 💪",
      roast: "This playlist sounds like an emotional support Chipotle order.",
      rating: "L/10",
      emoji: "😭",
      rotation: -2
    },
    {
      playlist: "Study Vibes 📚",
      roast: "We found 3 songs from Glee. Seek help.",
      rating: "Sus/10",
      emoji: "🤡",
      rotation: 3
    },
    {
      playlist: "Main Character ✨",
      roast: "Your taste in music is like a kazoo at a funeral — inappropriate and confusing to everyone.",
      rating: "NPC/10",
      emoji: "💀",
      rotation: -3
    },
    {
      playlist: "Shower Songs 🚿",
      roast: "You've somehow managed to create a playlist that's both basic and weird at the same time. Impressive.",
      rating: "Mid/10",
      emoji: "🫠",
      rotation: 2
    }
  ];

  return (
    <section className="bg-gray-900 py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="noise-overlay" />
      
      {/* Background decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 text-[200px] opacity-5 font-display"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        ROASTED
      </motion.div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl mb-6">
            <span className="block text-white">ROAST</span>
            <span className="block gradient-text animate-gradient-shift">SAMPLES</span>
          </h2>
          <p className="font-body text-xl text-gray-400 uppercase tracking-wider">
            Previous victims' <span className="text-pink-neon">emotional damage</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {roasts.map((roast, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotate: roast.rotation }}
              whileInView={{ opacity: 1, y: 0, rotate: roast.rotation }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.8,
                ease: [0.6, 0.01, 0.2, 0.95]
              }}
              whileHover={{ 
                rotate: roast.rotation * 1.5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="bg-black border-2 border-gray-800 p-8 lg:p-10 hover:border-orange-neon/50 transition-all duration-300">
                {/* Emoji badge */}
                <motion.div
                  className="absolute -top-6 -right-6 text-5xl"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  <span className="sticker">{roast.emoji}</span>
                </motion.div>

                {/* Rating badge */}
                <div className="absolute -top-4 left-8">
                  <span className="cutout-text text-sm px-3 py-1">
                    {roast.rating}
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="font-display text-2xl md:text-3xl text-gray-400 mb-2">
                    "{roast.playlist}"
                  </h3>
                  <div className="h-1 w-20 bg-gradient-to-r from-orange-neon to-pink-neon" />
                </div>

                <p className="font-body text-xl md:text-2xl text-white leading-relaxed italic">
                  "{roast.roast}"
                </p>

                {/* Decorative quotes */}
                <div className="absolute top-4 right-4 text-6xl text-gray-800 font-display opacity-50">
                  "
                </div>
                <div className="absolute bottom-4 left-4 text-6xl text-gray-800 font-display opacity-50 rotate-180">
                  "
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-neon/0 to-pink-neon/0 group-hover:from-orange-neon/10 group-hover:to-pink-neon/10 transition-all duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="font-body text-gray-600 text-sm uppercase tracking-[0.3em]">
            100% Real roasts • No filter • Pure chaos
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RoastExamples;