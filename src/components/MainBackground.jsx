import React from "react";
import { useState, useEffect } from "react";
import logo from "../img/logo.svg";
import { motion } from "framer-motion";
import { pageAnimation, logoAnimation } from "./animations";

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
    <motion.div
      className="main-background"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div className="hero">
        <motion.img
          className="main-logo"
          src={logo}
          alt="Logo principal de Retropia"
          variants={logoAnimation}
          animate="show"
          initial="hidden"
          exit="exit"
        />

        <div className="scene">
          <div
            className="grid"
            style={{ backgroundPositionY: bckPosY + "px" }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default MainBackground;
