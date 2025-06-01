import React from 'react';
import { motion } from 'framer-motion';
import { loginWithSpotify } from '../lib/spotify';
import RoastButton from './RoastButton';

const CTASection: React.FC = () => {
  return (
    <section className="bg-black py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="noise-overlay" />
      
      {/* Animated background text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-5"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [-1, 1, -1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <h3 className="font-display text-[150px] md:text-[200px] lg:text-[300px]">
          GO
        </h3>
      </motion.div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.6, 0.01, 0.2, 0.95] }}
        >
          <h2 className="font-display text-6xl md:text-8xl lg:text-9xl mb-8">
            <span className="block text-white">READY TO GET</span>
            <span className="block gradient-text-multi animate-gradient-shift text-7xl md:text-9xl lg:text-[150px]">ROASTED?</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-xl md:text-2xl text-gray-400 mb-12 uppercase tracking-wider"
          >
            Connect your Spotify • Get destroyed • <span className="text-orange-neon">Go viral</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.4,
              duration: 0.6,
              type: "spring",
              stiffness: 200
            }}
            className="inline-block relative"
          >
            <RoastButton 
              onClick={loginWithSpotify}
              text="Roast Me Now"
              size="xl"
              variant="hero"
            />

            {/* Floating stickers */}
            <motion.div
              className="absolute -top-8 -left-8 text-4xl"
              animate={{
                y: [0, -10, 0],
                rotate: [-10, 10, -10]
              }}
              transition={{
                duration: 3,
                repeat: Infinity
              }}
            >
              <span className="sticker">💯</span>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-8 -right-8 text-4xl"
              animate={{
                y: [0, 10, 0],
                rotate: [10, -10, 10]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity
              }}
            >
              <span className="sticker">🚀</span>
            </motion.div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm font-body uppercase tracking-wider text-gray-500"
          >
            <span>10K+ Roasted</span>
            <span className="text-orange-neon">•</span>
            <span>500+ Cried</span>
            <span className="text-pink-neon">•</span>
            <span>0 Survivors</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;