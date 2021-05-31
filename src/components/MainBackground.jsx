import React from 'react';
import { useState, useEffect } from 'react';
import logo from '../img/logo.svg';

const MainBackground = () => {
  const [bckPosY, setBckPosY] = useState();

  useEffect(() => {
    var x = 0;
    setInterval(function () {
      setBckPosY(x);
      console.log(x);
      x += 50;
    }, 1000);

    return () => {};
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
