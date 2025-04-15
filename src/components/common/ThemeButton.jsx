import React, { useState } from 'react';
import { useTheme, themes } from '@/context/ThemeContext';
import { ChevronDownIcon, ChevronUpIcon, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeButton = () => {
  const { theme, setTheme, currentTheme } = useTheme();
  const [isThemeDropdownOpen, setThemeDropdownOpen] = useState(false);

  return (
    <div>
      <div className="relative">
        <button
          onClick={() => setThemeDropdownOpen(!isThemeDropdownOpen)}
          className={`p-2 rounded-lg hover:${theme.secondary} transition-colors flex items-center space-x-2 cursor-pointer`}
        >
          <Layers className={`w-4 h-4 ${theme.highlight}`} />
          {isThemeDropdownOpen ? (
            <ChevronDownIcon className={`w-4 h-4 ${theme.highlight}`} />
          ) : (
            <ChevronUpIcon className={`w-4 h-4 ${theme.highlight}`} />
          )}
        </button>

        <AnimatePresence>
          {isThemeDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-100"
            >
              {Object.entries(themes).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setTheme(key);
                    setThemeDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left flex items-center space-x-2 cursor-pointer hover:bg-gray-100 ${
                    currentTheme === key ? 'bg-gray-200' : ''
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${value.secondary}`} />
                  <span className="text-sm text-gray-700">{value.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThemeButton;
