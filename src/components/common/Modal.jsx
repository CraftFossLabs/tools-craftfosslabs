import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useMediaQuery from '@/lib/useMediaQuery';

const modalRoot =
  document.getElementById('modal-root') ||
  (() => {
    const el = document.createElement('div');
    el.id = 'modal-root';
    document.body.appendChild(el);
    return el;
  })();

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariantsDesktop = {
  hidden: { y: 40, opacity: 0, scale: 0.98 },
  visible: { y: 0, opacity: 1, scale: 1 },
};

const modalVariantsMobile = {
  hidden: { y: '100%', opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Modal = ({ isOpen, onClose, children }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm px-1"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        onClick={onClose}
      >
        <motion.div
          className={`w-full max-w-lg relative z-50  ${isMobile ? 'mx-auto mt-auto mb-0' : ''
            }`}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={isMobile ? modalVariantsMobile : modalVariantsDesktop}
          onClick={(e) => e.stopPropagation()}
          drag={isMobile ? 'y' : false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            if (info.offset.y > 100 || info.velocity.y > 500) {
              onClose();
            }
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalRoot
  );
};

export default Modal;
