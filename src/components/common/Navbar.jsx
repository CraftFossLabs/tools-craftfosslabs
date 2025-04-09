import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, [])

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 backdrop-blur-sm">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/Logo.svg" className="h-8" alt="CraftFossTools Logo" loading='lazy' />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CraftFossTools</span>
          </Link>
          {/* Desktop Nav */}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto">
            <ul className="flex flex-col p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li><Link to="/" className={`block p-0  ${window.location.pathname === '/' ? 'text-purple-700 dark:text-purple-400 border-b' : 'text-gray-900 hover:text-blue-700 dark:text-white'}`}>Home</Link></li>
              <li><Link to="/about" className={`block p-0  ${window.location.pathname === '/about' ? 'text-purple-700 dark:text-purple-400 border-b' : 'text-gray-900 hover:text-blue-700 dark:text-white'}`}>About</Link></li>
                <li><Link to="/services" className={`block p-0${window.location.pathname === '/services' ? 'text-purple-700 dark:text-purple-400 border-b' : 'text-gray-900 hover:text-blue-700 dark:text-white'}`}>Services</Link></li>
              <li><Link to="/contact" className={`block p-0 ${window.location.pathname === '/contact' ? 'text-purple-700 dark:text-purple-400 border-b' : 'text-gray-900 hover:text-blue-700 dark:text-white'}`}>Contact</Link></li>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="text-gray-600 dark:text-gray-300 cursor-pointer">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => navigate('/register')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden md:block cursor-pointer">
              Get started
            </button>
            <button onClick={toggleSidebar} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
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
            className="fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white dark:bg-gray-900 z-30 shadow-lg p-5"
          >
            <button onClick={toggleSidebar} className="mb-4 text-gray-700 dark:text-white w-full text-end">✖</button>
            <ul className="space-y-4 text-lg">
              <li><Link to="/" onClick={toggleSidebar} className="block text-gray-800 dark:text-white">Home</Link></li>
              <li><Link to="/about" onClick={toggleSidebar} className="block text-gray-800 dark:text-white">About</Link></li>
              <li><Link to="/services" onClick={toggleSidebar} className="block text-gray-800 dark:text-white">Services</Link></li>
              <li><Link to="/contact" onClick={toggleSidebar} className="block text-gray-800 dark:text-white">Contact</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
