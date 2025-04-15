import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import BackgroundElement from './BackgroundElement';

const Card = ({ text, subheading, imageUrl }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  const handleMouseMove = e => {
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const percentX = mouseX / rect.width;
    const percentY = mouseY / rect.height;

    x.set(percentX);
    y.set(percentY);
  };

  const resetTilt = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        resetTilt();
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="relative bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg p-6 max-w-md min-w-96 min-h-72 w-full overflow-hidden cursor-pointer transition-transform duration-300"
    >
      <BackgroundElement />
      <div className="mb-16">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{text}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{subheading}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute -bottom-4 -right-2"
        style={{ transform: 'translateZ(40px)' }} // subtle depth
      >
        <img
          src={imageUrl}
          alt={text}
          loading="lazy"
          className="w-72 h-auto rounded-md shadow-md"
        />
      </motion.div>
    </motion.div>
  );
};

export default Card;
