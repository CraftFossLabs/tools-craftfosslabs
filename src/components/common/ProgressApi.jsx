import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';

const ProgressApi = () => {
  const { isProgressVisible } = useProgress();

  return (
    <AnimatePresence>
      {isProgressVisible && (
        <motion.div
          className={`
            fixed top-0 left-1/2 transform -translate-x-1/2 
            h-12 w-0 bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400
            rounded-full shadow-lg z-50
          `}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: 1,
            transition: { duration: 1, ease: 'easeInOut' },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3 },
          }}
          style={{ transformOrigin: 'center' }}
        />
      )}
    </AnimatePresence>
  );
};

export default ProgressApi;
