import React, { useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import useUserStore from '@/store/userStore';
import { useNavigate } from 'react-router-dom';

const CommonLayout = ({ children }) => {
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
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
