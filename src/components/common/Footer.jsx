import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 z-20">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        <p className="text-center text-gray-500 dark:text-gray-400">© 2024 <Link to="http://craftfosslabs.com/" target='blank' className="hover:underline">CraftFosslabs.com</Link> All rights reserved.</p>
       
       <div className="flex items-center gap-4">
        <Link to="/privacy-policy"><p className="text-center text-gray-500 dark:text-gray-400 hover:underline">Privacy Policy</p></Link>
        <Link to="/terms-condition"><p className="text-center text-gray-500 dark:text-gray-400 hover:underline">Terms & Conditions</p></Link>
       </div>
      </div>
    </footer>
  );
};

export default Footer;
