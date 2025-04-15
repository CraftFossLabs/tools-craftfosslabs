import React, { createContext, useContext, useEffect, useState } from 'react';

export const themes = {
  blue: {
    name: 'Ocean Blue',
    primary: 'from-[#FFF2F2] to-[F5F7F5]',
    secondary: 'bg-[#A9B5DF]',
    accent: 'bg-[#7886C7]',
    highlight: 'text-[#2D336B]',
    border: 'border-[#7886C7]',
    text: 'text-black',
    button: 'bg-[#A9B5DF] hover:bg-[#7886C7]',
  },
  Violet: {
    name: 'Violet Vibes',
    primary: 'from-[#F5EFFF] to-[F5F7F5]',
    secondary: 'bg-[#E5D9F2]',
    accent: 'text-[#CDC1FF]',
    highlight: 'text-[#A294F9]',
    border: 'border-[#7886C7]',
    text: 'text-black',
    button: 'bg-[#E5D9F2] hover:bg-[#CDC1FF]',
  },
  red: {
    name: 'Ruby Red',
    primary: 'from-[#1D1616] to-[#3d3d3d]',
    secondary: 'bg-[#8E1616]',
    accent: 'bg-[#EEEEEE]',
    highlight: 'text-[#D84040]',
    border: 'border-[#D84040]',
    text: 'text-white',
    button: 'bg-[3d3d3d] hover:bg-[#1e1e1e]',
  },
  teal: {
    name: 'Tropical Teal',
    primary: 'from-[#E3FEF7] to-[#FFFFFF]',
    secondary: 'bg-[#77B0AA]',
    accent: 'bg-[#135D66]',
    highlight: 'text-[#003C43]',
    border: 'border-[#003C43]',
    text: 'text-black',
    button: 'bg-[#77B0AA] hover:bg-[#135D66]',
  },
  Light: {
    name: 'Light',
    primary: 'from-gray-50 to-gray-100',
    secondary: 'bg-gray-500',
    accent: 'bg-gray-600',
    highlight: 'text-gray-900',
    border: 'border-gray-200',
    text: 'text-black',
    button: 'bg-gray-300 hover:bg-gray-400',
  },
  Dark: {
    name: 'Dark',
    primary: 'from-gray-900 to-gray-950',
    secondary: 'bg-gray-400',
    accent: 'bg-gray-600',
    highlight: 'text-gray-600',
    border: 'border-gray-700',
    text: 'text-white',
    button: 'bg-gray-700 hover:bg-gray-800',
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app-theme', currentTheme);
  }, [currentTheme]);

  const value = {
    theme: themes[currentTheme],
    setTheme: setCurrentTheme,
    currentTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
