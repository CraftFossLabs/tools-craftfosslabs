import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const Header = ({ children, title, text }) => {
  const { theme } = useTheme();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center space-x-4"
      >
        <div className={`p-3 rounded-full bg-gradient-to-r ${theme.primary}`}>{children}</div>
        <div>
          <h1 className={`md:text-3xl font-bold ${theme.highlight}`}>{title}</h1>
          <p className="md:text-lg">{text}</p>
        </div>
      </motion.div>
    </>
  );
};

export default Header;
