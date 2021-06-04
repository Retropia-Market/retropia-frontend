import { useState } from 'react';
import { useDispatch } from 'react-redux';

import LocationSelector from '../../ProductsComponents/NewSaleComponents/LocationSelector';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faCalendarAlt,
  faEnvelope,
  faPhone,
  faSignature,
  faUser,
  faMap,
} from '@fortawesome/free-solid-svg-icons';

function ProfileData({ updateField, user }) {
  console.log(user);

  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    email: '',
    username: '',
    location: '',
    bio: '',
  });

  const handleData = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8080/users/${user.userData.id}/update-profile`,
      {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      }
    );
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: 'UPDATE', data });
      setProfileData({
        firstName: '',
        lastName: '',
        birthDate: '',
        phone: '',
        email: '',
        username: '',
        location: '',
        bio: '',
      });
    } else {
      console.error(
        'estatus de respuesta: ',
        res.status,
        ' mensaje: ',
        res.statusText
      );
    }
  };

  return (
    <form onSubmit={handleData} className="profile-form profile-data">
      <h3 className="profile-update-section-title">Datos personales</h3>
      <label htmlFor="profile-update-name">Name</label>
      <div className="profile-update-field">
        <FontAwesomeIcon icon={faSignature}></FontAwesomeIcon>
        <input
          id="profile-update-name"
          type="text"
          value={profileData.firstName}
          name="firstName"
          placeholder={user.userData.firstName}
          onChange={(e) => updateField(e, setProfileData, profileData)}
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
          placeholder={user.userData.lastName}
          onChange={(e) => updateField(e, setProfileData, profileData)}
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
          placeholder={user.userData.birthDate}
          onChange={(e) => updateField(e, setProfileData, profileData)}
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
          placeholder={user.userData.phoneNumber}
          onChange={(e) => updateField(e, setProfileData, profileData)}
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
          placeholder={user.userData.email}
          onChange={(e) => updateField(e, setProfileData, profileData)}
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
          placeholder={user.userData.username}
          onChange={(e) => updateField(e, setProfileData, profileData)}
        />
      </div>
      <label htmlFor="profile-update-location">Location</label>
      <div className="profile-update-field">
        <FontAwesomeIcon icon={faMap}></FontAwesomeIcon>
        {/* <input 
          id="profile-update-location" 
          type="text"
          value={profileData.location}
          name="location"
          placeholder={user.userData.location}
          onChange={e => updateField(e, setProfileData, profileData)}
          /> */}
        <LocationSelector
          name="location"
          value="profileData.location"
          placeholder="user.userData.location"
          onChange={(e) => updateField(e, setProfileData, profileData)}
        />
      </div>
      <label htmlFor="profile-update-bio">Bio</label>
      <div className="profile-update-field">
        <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
        <textarea
          rows="10"
          cols="50"
          id="profile-update-bio"
          type="textarea"
          value={profileData.bio}
          name="bio"
          placeholder={user.userData.bio}
          onChange={(e) => updateField(e, setProfileData, profileData)}
        />
      </div>
      <button className="submit-button">Guardar Cambios</button>
    </form>
  );
}

export default ProfileData;
