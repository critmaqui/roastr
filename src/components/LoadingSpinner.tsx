import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-gray-700 rounded-full"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-500 rounded-full border-t-transparent" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-2xl">🔥</span>
        </motion.div>
      </div>
      
      <motion.p
        className="mt-4 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner; 