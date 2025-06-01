import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Zap, Sparkles, Music } from 'lucide-react';

interface RoastButtonProps {
  onClick: () => void;
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'hero';
  fullWidth?: boolean;
  spotify?: boolean;
}

const RoastButton: React.FC<RoastButtonProps> = ({ 
  onClick, 
  text = 'Get Roasted', 
  size = 'md',
  variant = 'primary',
  fullWidth = false,
  spotify = false
}) => {
  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-lg',
    lg: 'px-10 py-5 text-xl',
    xl: 'px-12 py-6 text-2xl'
  };

  const isSpotifyConnect = text?.toLowerCase().includes('spotify') || spotify;

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative group ${fullWidth ? 'w-full' : 'inline-block'}
        ${sizeClasses[size]}
        font-display font-black uppercase tracking-wider
        transform transition-all duration-300
        ${variant === 'hero' ? 'rounded-2xl' : 'rounded-full'}
        roast-button-glow overflow-visible
      `}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => {
        // Add electric pulse animation on hover
        const button = document.querySelector('.roast-button-hover');
        if (button) button.classList.add('animate-electric-pulse');
      }}
      onHoverEnd={() => {
        const button = document.querySelector('.roast-button-hover');
        if (button) button.classList.remove('animate-electric-pulse');
      }}
    >
      {/* Multiple layered backgrounds for depth */}
      <motion.div
        className={`absolute inset-0 ${isSpotifyConnect ? 'bg-gradient-to-r from-spotify-green via-green-400 to-spotify-green' : 'bg-gradient-to-r from-orange-neon via-pink-neon to-purple-neon'} rounded-full opacity-90`}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ backgroundSize: '200% 200%' }}
      />

      {/* Extra glow layer */}
      <motion.div
        className="absolute inset-0 rounded-full animate-explosion-glow"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
        }}
      />

      {/* Fire flicker effect */}
      <div className="absolute inset-0 rounded-full animate-fire-flicker opacity-50" />

      {/* Pulse rings */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white"
        animate={{
          scale: [1, 1.2, 1.4],
          opacity: [0.5, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />

      {/* Spotify logo for Connect Spotify button */}
      {isSpotifyConnect && (
        <motion.div
          className="absolute -left-8 top-1/2 transform -translate-y-1/2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 168 168"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-glow"
            >
              <path
                fill="#191414"
                d="M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 01-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 01-6.249-3.93 5.213 5.213 0 013.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 014.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 015.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 012.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"
              />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-3 text-black roast-button-hover">
        {/* Left icon - Music note for Spotify, fire for others */}
        <motion.span
          className="text-2xl"
          animate={{
            rotate: isSpotifyConnect ? [0, -10, 10, 0] : [0, -30, 30, 0],
            scale: [1, 1.3, 1.3, 1],
            y: [0, -5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {isSpotifyConnect ? '🎵' : '🔥'}
        </motion.span>

        {/* Main text with effects */}
        <span className="relative bounce-text">
          {text}
          {/* Lightning effect on text */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            {isSpotifyConnect ? (
              <Music className="w-full h-full text-black opacity-20" />
            ) : (
              <Zap className="w-full h-full text-yellow-300" />
            )}
          </motion.div>
          
          {variant === 'hero' && (
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400 drop-shadow-glow" />
            </motion.div>
          )}
        </span>

        {/* Right icon */}
        <motion.span
          className="text-2xl"
          animate={{
            rotate: isSpotifyConnect ? [0, 10, -10, 0] : [0, 30, -30, 0],
            scale: [1, 1.3, 1.3, 1],
            y: [0, -5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.75
          }}
        >
          {isSpotifyConnect ? '🎧' : '🔥'}
        </motion.span>
      </span>

      {/* Floating particles - more of them! */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: 0, 
            y: 0,
            opacity: 0
          }}
          animate={{
            x: [(i - 3) * 10, (i - 3) * 40],
            y: [0, -60],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut"
          }}
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {isSpotifyConnect ? (
            i % 2 === 0 ? (
              <Music className="w-5 h-5 text-black drop-shadow-glow" />
            ) : (
              <span className="text-lg">🎵</span>
            )
          ) : (
            i % 3 === 0 ? (
              <Flame className="w-5 h-5 text-orange-500 drop-shadow-glow" />
            ) : i % 3 === 1 ? (
              <Zap className="w-5 h-5 text-yellow-400 drop-shadow-glow" />
            ) : (
              <span className="text-lg">✨</span>
            )
          )}
        </motion.div>
      ))}

      {/* Corner badges for hero variant - more animated */}
      {variant === 'hero' && (
        <>
          <motion.div
            className={`absolute -top-4 -left-4 ${isSpotifyConnect ? 'bg-gradient-to-r from-spotify-green to-green-400' : 'bg-gradient-to-r from-yellow-400 to-orange-500'} text-black px-3 py-1 rounded-full text-xs font-bold shadow-glow-orange`}
            animate={{
              rotate: [-15, 15, -15],
              scale: [1, 1.2, 1],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {isSpotifyConnect ? '🎵 CONNECT' : '🔥 HOT'}
          </motion.div>
          <motion.div
            className="absolute -bottom-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-glow-orange"
            animate={{
              rotate: [15, -15, 15],
              scale: [1, 1.2, 1],
              y: [0, 5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            VIRAL 🚀
          </motion.div>
        </>
      )}

      {/* Extra visual flourish for xl size */}
      {size === 'xl' && (
        <motion.div
          className="absolute -inset-4 rounded-full opacity-30"
          style={{
            background: isSpotifyConnect 
              ? 'radial-gradient(circle at center, transparent 30%, rgba(30,215,96,0.4) 70%, transparent 100%)'
              : 'radial-gradient(circle at center, transparent 30%, rgba(255,107,53,0.4) 70%, transparent 100%)',
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      )}
    </motion.button>
  );
};

export default RoastButton; 