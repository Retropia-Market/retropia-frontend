import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Login from './Login';
import Register from './Register';
import Types from './navbar-components/Types';
import Categories from './navbar-components/Categories';
import Subcategories from './navbar-components/Subcategories';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../img/logo.svg';
import {
    faUser,
    faCommentDots,
    faBell,
} from '@fortawesome/free-regular-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import LanguageSelector from './intlComponents/LanguageSelector';

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
                    {!Object.keys(user).length ? (
                        <>
                            <button onClick={() => setShowLogin(true)}>
                                Log in
                            </button>
                            <button onClick={() => setShowRegister(true)}>
                                Register
                            </button>
                        </>
                    ) : (
                        <div className="user-nav">
                            <Link className="sell-button" to="/sell">
                                VENDER +
                            </Link>
                            <FontAwesomeIcon
                                className="messages"
                                icon={faCommentDots}
                            >
                                ICON
                            </FontAwesomeIcon>
                            <FontAwesomeIcon
                                className="notifications"
                                icon={faBell}
                            >
                                ICON
                            </FontAwesomeIcon>
                            <div className="user">
                                <FontAwesomeIcon
                                    className="user-pic"
                                    icon={faUser}
                                >
                                    Photo
                                </FontAwesomeIcon>
                                <div className="user-settings">
                                    <FontAwesomeIcon
                                        className="user-options"
                                        icon={faEllipsisH}
                                        onClick={() =>
                                            setShowSettings(!showSettings)
                                        }
                                    >
                                        Settings
                                    </FontAwesomeIcon>
                                    {showSettings && (
                                        <div className="user-settings">
                                            <li>
                                                <LanguageSelector />
                                            </li>
                                            <li>
                                                <Link
                                                    onClick={handleLogout}
                                                    to="/"
                                                >
                                                    Logout
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/profile">
                                                    Perfil
                                                </Link>
                                            </li>
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
                            hideSubcategories={() =>
                                setShowSubcategories(false)
                            }
                            type={type}
                            category={category}
                        />
                    )}
                </div>
            </div>

            {showLogin && (
                <Login
                    setShowLogin={setShowLogin}
                    setShowRegister={setShowRegister}
                />
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
