import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProfileUpdate from './profile-update/ProfileUpdate';
import ProfileFavs from './profile-favs/ProfileFavs';
import ProfileReviews from './profile-reviews/ProfileReviews';
// import ProfileTransactions from './profile-transaction/ProfileTransaction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentDots,
  faHandshake,
  faHeart,
  faStar,
  faUser,
} from '@fortawesome/free-regular-svg-icons';

function Profile() {
  const user = useSelector((s) => s.user);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="user-private-page">
      <ul className="user-private-sidebar">
        <NavLink to="/profile">
          <li className="user-sidebar-item">
            <FontAwesomeIcon icon={faUser} size="3x"></FontAwesomeIcon>
          </li>
        </NavLink>
        <NavLink to="/profile/chat">
          <li className="user-sidebar-item">
            <FontAwesomeIcon icon={faCommentDots} size="3x"></FontAwesomeIcon>
          </li>
        </NavLink>
        <NavLink to="/profile/favourites">
          <li className="user-sidebar-item">
            <FontAwesomeIcon icon={faHeart} size="3x"></FontAwesomeIcon>
          </li>
        </NavLink>
        <NavLink to="/profile/ratings">
          <li className="user-sidebar-item">
            <FontAwesomeIcon icon={faStar} size="3x"></FontAwesomeIcon>
          </li>
        </NavLink>
        <NavLink to="/profile/transactions">
          <li className="user-sidebar-item">
            <FontAwesomeIcon icon={faHandshake} size="3x"></FontAwesomeIcon>
          </li>
        </NavLink>
      </ul>
      <div className="user-private-content">
        <Switch>
          <Route path="/profile" exact>
            <ProfileUpdate />
          </Route>
          <Route path="/profile/chat" exact>
            Chat...
          </Route>
          <Route path="/profile/favourites" exact>
            <ProfileFavs />
          </Route>
          <Route path="/profile/ratings" exact>
            <ProfileReviews />
          </Route>
          <Route path="/profile/transactions">
            {/* <ProfileTransactions /> */}
          </Route>
          <Route path="/profile">Not Found</Route>
        </Switch>
      </div>
    </div>
  );
}

export default Profile;
