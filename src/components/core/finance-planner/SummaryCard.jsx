import React from 'react';
import { motion } from 'framer-motion';

const SummaryCard = ({ title, value, children, color = 'blue' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-sm p-4"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>{children}</div>
    </div>
  </motion.div>
);

export default SummaryCard;
