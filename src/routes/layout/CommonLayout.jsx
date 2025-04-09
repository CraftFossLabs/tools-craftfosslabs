import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer'; 

const CommonLayout = ({ children }) => {
  return (
    <>
      <Navbar />  
      <div className="bg-gray-50 dark:bg-gray-900 py-20 text-black dark:text-white min-h-screen flex flex-col justify-center items-center space-y-12">{children}</div>
      <Footer /> 
    </>
  );
};

export default CommonLayout;
