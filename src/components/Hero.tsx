import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const words = ['GET', 'YOUR', 'MUSIC', 'TASTE', 'BRUTALLY', 'ROASTED.'];
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section className="bg-black min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={container}
        className="relative z-10"
      >
        <h1 className="font-anton text-[202px] text-white tracking-[-0.03em] uppercase leading-[1em]">
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={item}
              className="block text-shadow hover:text-glow transition-all duration-300"
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"
      />
    </section>
  );
};

export default Hero;