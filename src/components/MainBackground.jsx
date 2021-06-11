import React from 'react';
import { useState, useEffect } from 'react';
import logo from '../img/logo.svg';
import {motion} from 'framer-motion'

const MainBackground = () => {
  const [bckPosY, setBckPosY] = useState();

  const svgVariantes = {
    hidde: {rotate : -180},
    visible : {
      rotate : 0,
      transition : {duration : 1}
    }
  }

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
    <div className="main-background">
      <div className="hero">
        <motion.img className="main-logo" src={logo} alt="Logo principal de Retropia"  animate={{opacity: 1, transition: {duration: 2}}} initial={{opacity : 0}}/>
        <div className="scene">
          <div
            className="grid"
            style={{ backgroundPositionY: bckPosY + 'px' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MainBackground;
