import React from 'react';
import { motion } from 'framer-motion';
import { loginWithSpotify } from '../lib/spotify';
import RoastButton from './RoastButton';
import SpotifyBadge from './SpotifyBadge';

const Hero: React.FC = () => {
  const words = ['GET', 'YOUR', 'MUSIC', 'TASTE', 'BRUTALLY', 'ROASTED.'];
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, 0.2, 0.95]
      }
    }
  };

  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 text-8xl opacity-10 font-display"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        🔥
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-10 text-6xl opacity-10 font-display"
        animate={{
          rotate: [360, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        💿
      </motion.div>

      {/* Spotify Badge */}
      <motion.div
        className="absolute top-20 right-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <SpotifyBadge size="sm" animated={true} showText={false} />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative z-10 text-center max-w-7xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-neon to-pink-neon text-black font-bold text-sm md:text-base uppercase tracking-wider animate-pulse-neon">
            AI-POWERED MUSIC ROASTING
          </span>
        </motion.div>

        <h1 className="font-display text-[40px] sm:text-[50px] md:text-[70px] lg:text-[90px] xl:text-[120px] 2xl:text-[150px] leading-[0.85em] mb-8">
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={item}
              className="block relative"
              style={{ perspective: '1000px' }}
            >
              <span 
                className={`
                  ${index === 5 ? 'gradient-text-multi animate-gradient-shift' : 'text-white'} 
                  ${index % 2 === 0 ? 'ml-auto mr-0 text-right' : 'mr-auto ml-0 text-left'}
                  ${index === 2 || index === 3 ? 'text-glow-pink' : ''}
                  inline-block max-w-full hover:animate-glitch cursor-default font-display
                `}
              >
                {word}
              </span>
              {index === 5 && (
                <motion.span
                  className="absolute -top-4 -right-4 text-4xl sticker"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2, type: "spring", stiffness: 200 }}
                >
                  💀
                </motion.span>
              )}
            </motion.span>
          ))}
        </h1>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <RoastButton 
            onClick={loginWithSpotify}
            text="Connect Spotify"
            size="lg"
            variant="hero"
            spotify={true}
          />

          <motion.p
            className="text-gray-400 font-body text-sm uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            No cap • 100% free • Pure chaos
          </motion.p>
        </motion.div>

        {/* Spotify integration badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-8 flex items-center justify-center gap-2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 168 168"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-50"
          >
            <path
              fill="#1ED760"
              d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
            />
          </svg>
          <span className="text-gray-500 text-xs uppercase tracking-wider">Spotify Integration</span>
        </motion.div>

        {/* Floating badges */}
        <motion.div
          className="absolute -bottom-10 left-1/4 transform -translate-x-1/2"
          animate={{
            y: [0, -20, 0],
            rotate: [-5, 5, -5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="bg-purple-neon text-black px-4 py-2 rounded-full font-bold text-xs uppercase transform rotate-12">
            Gen Z Approved
          </div>
        </motion.div>

        <motion.div
          className="absolute -bottom-10 right-1/4 transform translate-x-1/2"
          animate={{
            y: [0, -15, 0],
            rotate: [5, -5, 5]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="bg-blue-neon text-black px-4 py-2 rounded-full font-bold text-xs uppercase transform -rotate-12">
            No 🧢 Guarantee
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-purple-500/10"
      />
    </section>
  );
};

export default Hero;