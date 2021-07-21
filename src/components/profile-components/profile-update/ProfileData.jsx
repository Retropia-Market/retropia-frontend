import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';

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
import { FormattedMessage } from 'react-intl';

function ProfileData({ updateField, user }) {
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    firstname: '',
    lastname: '',
    birth_date: '',
    phone_number: '',
    email: '',
    username: '',
    location: '',
    bio: '',
  });
  const [location, setLocation] = useState();

  const handleData = async (e) => {
    e.preventDefault();
    setProfileData((profile) => (profile['location'] = location));
    const res = await fetch(
      `https://api.retropia-market.com/users/${user.userData.id}/update-profile`,
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
        firstname: '',
        lastname: '',
        birth_date: '',
        phone_number: '',
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

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={handleData} className="profile-form profile-data">
      <h3 className="profile-update-section-title">
        <FormattedMessage id="profile.update.personalinfo" />
      </h3>
      <div className="profile-update-fields">
        <div className="profile-update-fields-1">
          <div className="profile-update-field">
            <label
              className="profile-update-field-label"
              htmlFor="profile-update-name"
            >
              <FormattedMessage id="profile.update.name" />
            </label>
            <div className="profile-update-input">
              <FontAwesomeIcon icon={faSignature}></FontAwesomeIcon>
              <input
                id="profile-update-name"
                type="text"
                value={profileData?.firstname}
                name="firstname"
                placeholder={user?.userData?.firstName}
                onChange={(e) => updateField(e, setProfileData, profileData)}
              />
            </div>
          </div>
          <div className="profile-update-field">
            <label
              className="profile-update-field-label"
              htmlFor="profile-update-last-name"
            >
              <FormattedMessage id="profile.update.lastname" />
            </label>
            <div className="profile-update-input">
              <FontAwesomeIcon icon={faSignature}></FontAwesomeIcon>
              <input
                id="profile-update-last-name"
                type="text"
                value={profileData?.lastname}
                name="lastname"
                placeholder={user?.userData?.lastName}
                onChange={(e) => updateField(e, setProfileData, profileData)}
              />
            </div>
          </div>
          <div className="profile-update-field">
            <label
              className="profile-update-field-label"
              htmlFor="profile-update-location"
            >
              <span>
                <FontAwesomeIcon icon={faMap}></FontAwesomeIcon>
              </span>
              <span>
                <FormattedMessage id="profile.update.location" />
              </span>
            </label>
            <div className="profile-update-input location-selector-container">
              <LocationSelector
                id="profile-update-location"
                name="location"
                value="profileData.location"
                placeholder={user?.userData?.location}
                setProductLocation={setLocation}
              />
            </div>
          </div>
          <div className="profile-update-field">
            <label
              className="profile-update-field-label"
              htmlFor="profile-update-birth"
            >
              <FormattedMessage id="profile.update.birthdate" />
            </label>
            <div className="profile-update-input">
              <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
              <input
                id="profile-update-birth"
                type="date"
                value={profileData?.birth_date}
                name="birth_date"
                placeholder={user?.userData?.birthDate}
                onChange={(e) => updateField(e, setProfileData, profileData)}
              />
            </div>
          </div>
          {/* <div className="profile-update-field">
                        <label className="profile-update-field-label" htmlFor="profile-update-bio">
                            <span>
                                <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
                            </span>
                            <span>
                                Bio
                            </span>
                        </label>
                        <div className="profile-update-input" id="bio-input">
                            <textarea
                                id="profile-update-bio"
                                type="textarea"
                                value={profileData?.bio}
                                name="bio"
                                placeholder={user?.userData?.bio}
                                onChange={(e) =>
                                    updateField(e, setProfileData, profileData)
                                }
                            />
                        </div>
                    </div> */}
        </div>
        <div className="profile-update-fields-2">
          <div className="profile-update-field">
            <label
              className="profile-update-field-label"
              htmlFor="profile-update-username"
            >
              <FormattedMessage id="profile.update.username" />
            </label>
            <div className="profile-update-input">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              <input
                id="profile-update-username"
                type="text"
                value={profileData?.username}
                name="username"
                placeholder={user.userData.username}
                onChange={(e) => updateField(e, setProfileData, profileData)}
              />
            </div>
          </div>
          <div className="profile-update-field">
            <label
              className="profile-update-field-label"
              htmlFor="profile-update-email"
            >
              <FormattedMessage id="profile.update.email" />
            </label>
            <div className="profile-update-input">
              <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              <input
                id="profile-update-email"
                type="email"
                value={profileData?.email}
                name="email"
                placeholder={user?.userData.email}
                onChange={(e) => updateField(e, setProfileData, profileData)}
              />
            </div>
          </div>
          <div className="profile-update-field">
            <label
              className="profile-update-field-label"
              htmlFor="profile-update-phone_number"
            >
              <FormattedMessage id="profile.update.phone" />
            </label>
            <div className="profile-update-input">
              <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
              <input
                id="profile-update-phone_number"
                type="phone_number"
                value={profileData?.phoneNumber}
                name="phone_number"
                placeholder={user?.userData?.phoneNumber}
                onChange={(e) => updateField(e, setProfileData, profileData)}
              />
            </div>
          </div>
          <button className="submit-button-1 profile-update-button">
            <FormattedMessage id="profile.update.savechanges" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProfileData;
