import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const CommonLayout = ({ children }) => {
  return (
    <> 
      <Navbar />
      <div className="dark:bg-gray-900 min-h-screen py-20 text-black dark:text-white">
      {children}
      </div>
      <Footer /> 
    </>
  );
};

export default CommonLayout;
