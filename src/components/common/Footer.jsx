import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={`bg-gradient-to-l ${theme.primary} w-full z-20 border-t ${theme.border}/20 backdrop-blur-sm ${theme.text}`}
    >
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <p className="text-center">
          © 2024{' '}
          <Link to="http://craftfosslabs.com/" target="blank" className="hover:underline">
            CraftFosslabs.com
          </Link>{' '}
          All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <Link to="/privacy-policy">
            <p className="text-center  hover:underline">Privacy Policy</p>
          </Link>
          <Link to="/terms-condition">
            <p className="text-center hover:underline">Terms & Conditions</p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
