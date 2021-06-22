import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageAnimation } from './animations';

const RetroBackground = () => {
  const [bckPosY, setBckPosY] = useState();

  useEffect(() => {
    var x = 0;
    const interval = setInterval(function () {
      setBckPosY(x);
      x += 10;
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      className="main-background"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="scene">
        <div
          className="grid"
          style={{ backgroundPositionY: bckPosY + 'px' }}
        ></div>
      </div>
    </motion.div>
  );
};

export default RetroBackground;
