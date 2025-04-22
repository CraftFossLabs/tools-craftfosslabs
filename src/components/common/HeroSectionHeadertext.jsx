import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { motion } from 'framer-motion';

const HeroSectionHeadertext = ({ title, title2, subtext }) => {
  const { theme } = useTheme();
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };
  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-16">
      <motion.h1 variants={slideUp} className="text-4xl md:text-6xl font-bold mb-6">
        {title} <span className={`${theme.highlight}`}>{title2}</span>
      </motion.h1>
      <motion.p variants={slideUp} className="text-xl max-w-3xl mx-auto">
        {subtext}
      </motion.p>
    </motion.div>
  );
};

export default HeroSectionHeadertext;
