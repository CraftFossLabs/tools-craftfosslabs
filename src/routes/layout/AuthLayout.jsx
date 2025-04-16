import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const AuthLayout = ({ children }) => {
  const { theme } = useTheme();
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.6 } },
  };

  return (
    <>
      <motion.div
        className={`xl:w-full lg:max-w-full md:max-w-7xl mx-auto min-h-screen flex md:flex-row flex-col-reverse justify-center items-center gap-6  bg-gradient-to-bl ${theme.primary}  ${theme.text}  xl:p-48  lg:p-12 py-20 p-2`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div className="md:w-1/2 w-full">
          <div className="h-auto min-h-96 p-6 rounded-lg flex flex-col justify-between items-start">
            <img src="/assets/tools.png" alt="auth Page" loading="lazy" />
            <motion.p variants={textVariants} className="text-xl mt-4 font-semibold">
              Our Tools 🚀 are mainly made for your day to day life. Make it easier for your day to
              day <span className="underline">Dev</span> as well as professional works — for free
              mostly.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};

export default AuthLayout;
