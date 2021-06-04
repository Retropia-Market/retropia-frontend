import React from 'react';
import { useState, useEffect } from 'react';
import logo from '../img/logo.svg';

const MainBackground = () => {
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
    <div className="main-background">
      <div class="hero">
        <img className="main-logo" src={logo} alt="" />
        <div class="scene">
          <div
            class="grid"
            style={{ backgroundPositionY: bckPosY + 'px' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MainBackground;
