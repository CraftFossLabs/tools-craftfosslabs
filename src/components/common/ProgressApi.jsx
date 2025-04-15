import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@/context/ProgressContext';
import { useTheme } from '@/context/ThemeContext';

const ProgressApi = () => {
  const { isProgressVisible } = useProgress();
  const { theme } = useTheme();

  return (
    <AnimatePresence>
      {isProgressVisible && (
        <motion.div
          className={`fixed top-0 left-0 right-0 h-[3px] ${theme.accent} z-50`}
          initial={{ width: 0 }}
          animate={{ width: '100%', transition: { duration: 2, ease: 'easeInOut' } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        />
      )}
    </AnimatePresence>
  );
};

export default ProgressApi;
