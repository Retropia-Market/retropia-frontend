import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Login from './profile-components/profile-authentication/Login';
import Register from './profile-components/profile-authentication/Register';
import Types from './navbar-components/Types';
import Categories from './navbar-components/Categories';
import Subcategories from './navbar-components/Subcategories';
import { FormattedMessage } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../img/logo.svg';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import LanguageSelector from './intlComponents/LanguageSelector';
import MessageNotifications from './notification-components/MessageNotifications';
import ReviewsAndBidsNotifications from './notification-components/ReviewsAndBidsNotifications';

function Navbar() {
  const { q } = useParams();
  const history = useHistory();
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [search, setSearch] = useState(q || '');
  const [typeIndex, setTypeIndex] = useState(null);
  const [type, setType] = useState();
  const [category, setCategory] = useState();
  const [categoryIndex, setCategoryIndex] = useState(1);
  const [showCategories, setShowCategories] = useState(true);
  const [showSubcategories, setShowSubcategories] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/search/' + search);
  };

  const handleLogout = (e) => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleHideSubcategoriesClick = () => {
    setShowCategories(true);
    setShowSubcategories(false);
  };

  return (
    <>
      <div className="navbar-container">
        <Link className="logo" to="/">
          <img href="/" src={logo} alt="Logo Retropia Market" />
        </Link>

        <div className="search">
          <form className="search-bar" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ingresa tu búsqueda..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>🔍</button>
          </form>
        </div>
        <div className="types" onClick={handleHideSubcategoriesClick}>
          <Types
            typeIndex={typeIndex}
            setTypeIndex={setTypeIndex}
            setType={setType}
          />
        </div>
        <div className="user-nav">
          <LanguageSelector />
          {!Object.keys(user).length ? (
            <div className="user-access">
              <button className="user-access-login" onClick={() => setShowLogin(true)}>
                <FormattedMessage id="navbar.login" />
              </button>
              <span className="user-access-separator">
                /
              </span>
              <button className="user-access-register" onClick={() => setShowRegister(true)}>
                <FormattedMessage id="navbar.register" />
              </button>
            </div>
          ) : (
            <div className="user-nav">
              <Link className="sell-button" to="/sell">
                <FormattedMessage id="navbar.sell" />
              </Link>
              <MessageNotifications />
              <ReviewsAndBidsNotifications />

              <div className="user">
                <Link to={`/users/${user.userData.id}`}>
                  <FontAwesomeIcon className="user-pic" icon={faUser}>
                    Photo
                  </FontAwesomeIcon>
                </Link>
                <div className="user-settings">
                  <FontAwesomeIcon
                    className="user-settings-button"
                    icon={faEllipsisH}
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    Settings
                  </FontAwesomeIcon>
                  {showSettings && (
                    <div className="user-settings-menu-container">
                      <div className="user-settings-menu">
                        <div className="user-settings-menu-arrow"></div>
                        <div className="user-settings-menu-list">
                          <li className="menu-item">
                            <Link className="menu-link" onClick={handleLogout} to="/">
                              <FormattedMessage id="navbar.logout" />
                            </Link>
                          </li>
                          <li className="menu-item">
                            <Link className="menu-link" to="/profile">
                              <FormattedMessage id="navbar.profile" />
                            </Link>
                          </li>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="lower">
          {showCategories && (
            <Categories
              setCategoryIndex={setCategoryIndex}
              setCategory={setCategory}
              type={type}
              category={category}
              hideCategories={() => setShowCategories(false)}
              showSubcategories={() => setShowSubcategories(true)}
            />
          )}
          {showSubcategories && (
            <Subcategories
              categoryIndex={categoryIndex}
              showCategories={() => setShowCategories(true)}
              hideSubcategories={() => setShowSubcategories(false)}
              type={type}
              category={category}
            />
          )}
        </div>
      </div>

      {showLogin && (
        <Login setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
      )}
      {showRegister && (
        <Register
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
        />
      )}
    </>
  );
}

export default Navbar;
