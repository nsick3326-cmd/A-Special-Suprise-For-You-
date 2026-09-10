import React from 'react';
import { motion } from 'framer-motion';

export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.99 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="min-h-screen pt-24 pb-28 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto flex flex-col justify-center items-center relative z-10"
    >
      {children}
    </motion.div>
  );
};
