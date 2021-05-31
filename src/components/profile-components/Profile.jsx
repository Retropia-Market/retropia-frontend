import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

import ProfileUpdate from './profile-update/ProfileUpdate'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCommentDots, faHandshake, faHeart, faStar, faUser } from '@fortawesome/free-regular-svg-icons';


function Profile() {

  const user = useSelector(s => s.user)

   if(!user) {
    return <Redirect to='/' />
  }

  return <div className="user-private-menu">
    <ul className='user-private-sidebar'>
      <li className="user-sidebar-item">
          <NavLink to='/profile'>
            <FontAwesomeIcon icon={ faUser } size="3x" ></FontAwesomeIcon>
          </NavLink>
      </li>
      <li className="user-sidebar-item">
        <NavLink to='/profile/chat'>
          <FontAwesomeIcon icon={ faCommentDots } size="3x"></FontAwesomeIcon>
        </NavLink>
      </li>
      <li className="user-sidebar-item">
        <NavLink to='/profile/favourites'>
          <FontAwesomeIcon icon={ faHeart } size="3x"></FontAwesomeIcon>
        </NavLink>
      </li>
      <li className="user-sidebar-item">
        <NavLink to='/profile/ratings'>
          <FontAwesomeIcon icon={ faStar } size="3x"></FontAwesomeIcon>
        </NavLink>
      </li>
      <li className="user-sidebar-item">
        <NavLink to='/profile/transactions'>
          <FontAwesomeIcon icon={ faHandshake } size="3x"></FontAwesomeIcon>
        </NavLink>
      </li>
    </ul>
    <div className="content">
      <Switch>
        <Route path="/profile">
          <ProfileUpdate/>
        </Route>
      </Switch>
    </div>
  </div>
}

export default Profile