import logo from '../img/logo.svg';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logo">
        <img src={logo} alt="Logo Retropia Market" />
      </div>
      <div className="right-navbar">
        <div className="upper">
          <div className="search">
            <div className="search-bar">
              <input type="text" placeholder="Ingresa tu búsqueda..." />
              <button>🔍</button>
            </div>
            <div className="categories">
              <div className="consolas">CONSOLAS</div>
              <div className="videogames">VIDEOJUEGOS</div>
              <div className="gadgets">PERIFÉRICOS</div>
            </div>
          </div>
          <div className="user-nav">
            <div className="sell-button">VENDER +</div>
            <div className="messages">ICON</div>
            <div className="notifications">ICON</div>
            <div className="user">
              <div className="user-pic">FOTO</div>
              <div className="user-settings">ICON</div>
            </div>
          </div>
        </div>
        <div className="lower"></div>
      </div>
    </div>
  );
};

export default Navbar;
