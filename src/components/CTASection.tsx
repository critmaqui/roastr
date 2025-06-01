import React from 'react';
import { motion } from 'framer-motion';
import { loginWithSpotify } from '../lib/spotify';

const CTASection: React.FC = () => {
  return (
    <section className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent"
      />
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow"
        >
          Ready to get roasted?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-300 mb-8"
        >
          Connect your Spotify playlist and let AI go wild.
        </motion.p>
        
        <motion.button
          className="px-8 py-4 bg-orange-500 text-white text-lg font-medium rounded-full relative overflow-hidden group"
          onClick={loginWithSpotify}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.4,
            type: "spring",
            stiffness: 200
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="animate-pulse">🔥</span>
            Roast Me Now
          </span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </section>
  );
};

export default CTASection