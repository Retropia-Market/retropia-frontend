import logo from '../img/logo.svg';
import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logo">
        <img src={logo} alt="Logo Retropia Market" />
      </div>

      <div className="search">
        <input type="text" placeholder="¿Qué estás buscando?..." />
        <button>🔍</button>
      </div>

      <div className="categories">
        <div className="category">CONSOLAS</div>
        <div className="category">VIDEOJUEGOS</div>
        <div className="category">PERIFÉRICOS</div>
      </div>

      <div className="user">
        <div className="sell-button">VENDER +</div>
        <div className="messages">ICON</div>
        <div className="notifications">ICON</div>
        <div className="user-button">
          <div className="user-pic">FOTO</div>
          <div className="user-settings">ICON</div>
        </div>
      </div>

      <div className="lower">
        <div className="subcategories">
          <div className="subcategory">Nintendo</div>
          <div className="subcategory">Sony</div>
          <div className="subcategory">Microsoft</div>
          <div className="subcategory">Sega</div>
          <div className="subcategory">Arcade</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
