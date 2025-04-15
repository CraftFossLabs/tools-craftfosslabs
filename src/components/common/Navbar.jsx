import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import ThemeButton from './ThemeButton';
import { useTheme } from '@/context/ThemeContext';
import { X } from 'lucide-react';

const Navbar = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <nav
        className={`bg-gradient-to-l ${theme.primary} fixed w-full z-20 top-0 start-0 border-b ${theme.border} backdrop-blur-sm ${theme.text}`}
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto md:p-4 p-2">
          <Link to="/" className="flex items-center md:space-x-3 space-x-1 rtl:space-x-reverse">
            <img src="/Logo.svg" className="md:h-8 h-4" alt="CraftFossTools Logo" loading="lazy" />
            <span className="self-center md:text-2xl text-lg font-semibold whitespace-nowrap">
              CraftFossTools
            </span>
          </Link>
          {/* Desktop Nav */}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto">
            <ul className="flex flex-col p-0 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row">
              <li>
                <Link
                  to="/"
                  className={`block p-0  ${window.location.pathname === '/' ? `${theme.highlight}  border-b ${theme.border}` : `hover:${theme.highlight}`}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={`block p-0  ${window.location.pathname === '/about' ? `${theme.highlight}  border-b ${theme.border}` : `hover:${theme.highlight}`}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className={`block p-0 ${window.location.pathname === '/services' ? `${theme.highlight}  border-b ${theme.border}` : `hover:${theme.highlight}`}`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`block p-0 ${window.location.pathname === '/contact' ? `${theme.highlight}  border-b ${theme.border}` : `hover:${theme.highlight}`}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center md:space-x-4 space-x-2">
            <ThemeButton />
            <Button
              variant="outline"
              className={`border ${theme.border}  ${theme.highlight}`}
              onClick={() => navigate('/register')}
            >
              Get Started
            </Button>
            <button
              onClick={toggleSidebar}
              className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm ${theme.highlight} rounded-lg md:hidden hover:${theme.secondary} cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 17 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className={`fixed top-0 left-0 w-3/5 sm:w-1/2 h-full ${theme.secondary} ${theme.text} z-30 shadow-lg p-5`}
          >
            <button
              onClick={toggleSidebar}
              className={`mb-4 cursor-pointer w-full flex justify-end items-center ${theme.text}`}
            >
              <X />
            </button>
            <ul className={`space-y-4 text-lg ${theme.text}`}>
              <li>
                <Link to="/" onClick={toggleSidebar} className={`block ${theme.border}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={toggleSidebar} className={`block ${theme.border}`}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={toggleSidebar} className={`block ${theme.border}`}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={toggleSidebar} className={`block ${theme.border}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
