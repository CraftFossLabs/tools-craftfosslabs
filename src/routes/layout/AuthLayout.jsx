import React from 'react'
import { motion } from 'framer-motion'

const AuthLayout = ({ children }) => {
  // Fade-in/out variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: 'easeIn' } }
  }

  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.6 } }
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto flex md:flex-row flex-col justify-center items-center gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div  className="md:w-1/2 w-full">
        <div className="bg-gradient-to-bl from-gray-300 to-pink-300 h-full min-h-96 p-6 rounded-lg flex flex-col justify-between items-start shadow-lg">
            <img src="/assets/tools.png" alt="" />
          <motion.p variants={textVariants} className="text-xl mt-4">
            Our Tools 🚀 are mainly made for your day to day life.
            Make it easier for your day to day <span className="underline">Dev</span> as well as professional works — for free mostly.
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
  )
}

export default AuthLayout
