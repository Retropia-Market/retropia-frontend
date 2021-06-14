import {
  NavLink,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import ProfileUpdate from "./profile-update/ProfileUpdate";
import ProfileFavs from "./profile-favs/ProfileFavs";
import ProfileReviews from "./profile-reviews/ProfileReviews";
import ProfileTransactions from "./profile-transaction/ProfileTransaction";
import Chat from "../chat-components/Chat";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faHandshake,
  faHeart,
  faStar,
  faUser,
} from "@fortawesome/free-regular-svg-icons";

function Profile() {
  const user = useSelector((s) => s.user);
  const location = useLocation();

  if (!Object.keys(user).length) {
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
        <NavLink to="/profile/transactions/bids/made">
          <li className="user-sidebar-item">
            <FontAwesomeIcon icon={faHandshake} size="3x"></FontAwesomeIcon>
          </li>
        </NavLink>
      </ul>
      <div className="user-private-content">
        {/* <AnimatePresence> */}
          <Switch location={location} key={location.pathname}>
            <Route path="/profile" exact>
              <ProfileUpdate user={user} />
            </Route>
            <Route path="/profile/chat">
              <Chat user={user} />
            </Route>
            <Route path="/profile/favourites" exact>
              <ProfileFavs user={user} />
            </Route>
            <Route path="/profile/ratings" exact>
              <ProfileReviews user={user} />
            </Route>
            <Route path="/profile/transactions">
              <ProfileTransactions user={user} />
            </Route>
            <Route path="/profile">Not Found</Route>
          </Switch>
        {/* </AnimatePresence> */}
      </div>
    </div>
  );
}

export default Profile;
