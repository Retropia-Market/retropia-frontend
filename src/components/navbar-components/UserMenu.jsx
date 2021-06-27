import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import { useDispatch } from 'react-redux';

export function UserMenu({user}) {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    dispatch({ type: 'LOGOUT' });
  };

  return <>
    <div className="user-settings-menu-container">
      <div className="user-settings-menu">
        <div className="user-settings-menu-arrow"></div>
        <div className="user-settings-menu-list">
          <li className="menu-item">
            <Link
                  className="menu-link"
                  to={`/users/${user.userData.id}`}
            >
              <FormattedMessage id="navbar.public.profile"/>
            </Link>
          </li>
          <li className="menu-item">
            <Link 
              className="menu-link" 
              to="/profile"
            >
              <FormattedMessage id="navbar.profile" />
            </Link>
          </li>
          <li className="menu-item">
            <Link
              className="menu-link"
              to="/"
              onClick={handleLogout}
            >
              <FormattedMessage id="navbar.logout" />
            </Link>
          </li>
        </div>
      </div>
    </div>
  </>
}