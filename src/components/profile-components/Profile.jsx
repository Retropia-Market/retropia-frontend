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
        <li className="user-sidebar-item">
          <NavLink to="/profile">
            <FontAwesomeIcon icon={faUser} size="3x"></FontAwesomeIcon>
          </NavLink>
        </li>
        <li className="user-sidebar-item">
          <NavLink to="/profile/chat">
            <FontAwesomeIcon icon={faCommentDots} size="3x"></FontAwesomeIcon>
          </NavLink>
        </li>
        <li className="user-sidebar-item">
          <NavLink to="/profile/favourites">
            <FontAwesomeIcon icon={faHeart} size="3x"></FontAwesomeIcon>
          </NavLink>
        </li>
        <li className="user-sidebar-item">
          <NavLink to="/profile/ratings">
            <FontAwesomeIcon icon={faStar} size="3x"></FontAwesomeIcon>
          </NavLink>
        </li>
        <li className="user-sidebar-item">
          <NavLink to="/profile/transactions">
            <FontAwesomeIcon icon={faHandshake} size="3x"></FontAwesomeIcon>
          </NavLink>
        </li>
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
