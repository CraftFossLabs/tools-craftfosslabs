import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const CommonLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="text-black  min-h-screen flex flex-col justify-center items-center pt-12">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default CommonLayout;
