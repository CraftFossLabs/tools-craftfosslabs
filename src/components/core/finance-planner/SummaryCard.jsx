import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const SummaryCard = ({ title, value, children, color = 'blue' }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-tl ${theme.primary} rounded-md shadow-sm p-4 border-l ${theme.border} ${theme.text} `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm">{title}</p>
          <p className="text-xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>{children}</div>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
