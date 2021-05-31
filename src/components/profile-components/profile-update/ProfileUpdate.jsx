import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faCalendarAlt,
  faChevronUp,
  faEnvelope,
  faLock,
  faPhone,
  faSignature,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

function ProfileUpdate() {

  const dispatch = useDispatch()
  const user = useSelector(s => s.user)
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    birthDate: undefined,
    phone: '',
    email: '',
    username: '',
    location: '',
    bio:'',
  });

  const handleData = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8080/users/${user.id}/update-profile`, {
      method: 'PATCH',
      headers: { 
        'Authorization': 'Bearer ' + user.token,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(profileData),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: 'LOGIN', user: data });
      console.log(data);
    } else {
      alert('parece que algo salio mal');
      const data = await res.json();
      console.log(data);
    }
  };

  const updateField = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  if(!user) {
    return <div>no user found</div>
  }

  return <div className="profile-update">
    <h2>Gestion de perfil</h2>
    <div className="profile-img"></div>
    <form onSubmit={handleData} className="profile-data">
      <h3 className="profile-update-section-title">Datos personales</h3>
      <label htmlFor="profile-update-name">Name</label>
      <div className="profile-update-field">
        <FontAwesomeIcon icon={faSignature}></FontAwesomeIcon>
        <input 
          id="profile-update-name" 
          type="text"
          value={profileData.firstName}
          name="firstName"
          onChange={updateField}
          />
      </div>
      <label htmlFor="profile-update-last-name">Lastame</label>
      <div className="profile-update-field">
        <FontAwesomeIcon icon={faSignature}></FontAwesomeIcon>
        <input 
          id="profile-update-last-name" 
          type="text"
          value={profileData.lastName}
          name="lastName"
          onChange={updateField}
          />
      </div>
      <label htmlFor="profile-update-birth">Birth Date</label>
      <div className="profile-update-field">
        <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
        <input 
          id="profile-update-birth" 
          type="date"
          value={profileData.birthDate}
          name="birthDate"
          onChange={updateField}
          />
      </div>
      <label htmlFor="profile-update-phone">Phone</label>
      <div className="profile-update-field">
        <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
        <input 
          id="profile-update-phone" 
          type="phone"
          value={profileData.phone}
          name="phone"
          onChange={updateField}
          />
      </div>
      <label htmlFor="profile-update-email">Email</label>
      <div className="profile-update-field">
        <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
        <input 
          id="profile-update-email" 
          type="email"
          value={profileData.email}
          name="email"
          onChange={updateField}
          />
      </div>
      <label htmlFor="profile-update-username">Username</label>
      <div className="profile-update-field">
        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        <input 
          id="profile-update-username" 
          type="text"
          value={profileData.username}
          name="username"
          onChange={updateField}
          />
      </div>
      <label htmlFor="profile-update-location">Location</label>
      <div className="profile-update-field">
        <FontAwesomeIcon icon={faMap}></FontAwesomeIcon>
        <input 
          id="profile-update-location" 
          type="text"
          value={profileData.country}
          name="location"
          onChange={updateField}
          />
      </div>
      <label htmlFor="profile-update-bio">Bio</label>
      <div className="profile-update-field">
        <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
        <input 
          id="profile-update-bio" 
          type="textarea"
          value={profileData.bio}
          name="bio"
          onChange={updateField}
          />
      </div>
      <button className="submit-button">Guardar cambios</button>
    </form>
    <form action="" className="profile-password"></form>
  </div>
}

export default ProfileUpdate