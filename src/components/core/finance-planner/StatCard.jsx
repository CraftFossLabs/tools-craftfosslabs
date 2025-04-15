import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const StatCard = ({ title, value, color, children }) => {
  const { theme } = useTheme();
  const formatValue = val => {
    if (typeof val !== 'string') {
      return val.toLocaleString('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
      });
    }
    return val;
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-bl ${theme.primary}  rounded-xl shadow-sm p-6 border-l ${theme.border}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${theme.highlight}`}>{title}</p>
          <p className="text-2xl font-bold mt-1">{formatValue(value)}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>{children}</div>
      </div>
    </motion.div>
  );
};

export default StatCard;
