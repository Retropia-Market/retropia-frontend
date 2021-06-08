import { useState } from "react";
// import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUnlock, faLock, faUserLock } from '@fortawesome/free-solid-svg-icons';

function ProfilePassword ({updateField, user}) {

  const [errorMessage, setErrorMessage] = useState('');
  const [profilePassword, setProfilePassword] = useState({
    oldPassword: '',
    newPassword: '',
    repeatedNewPassword: '',
  }); 

  const handlePassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = await fetch(`http://localhost:8080/users/${user.userData.id}/update-password`, {
      method: 'PATCH',
      headers: { 
        'Authorization': 'Bearer ' + user.token,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(profilePassword),
    });
    console.log(res)
    if (res.ok) {
      setProfilePassword({
        oldPassword: '',
        newPassword: '',
        repeatedNewPassword: '',
      })
      console.log(res)
    } else if(res.status === 401){
      setErrorMessage('Contraseña Incorrecta.');
      console.log(errorMessage);
    } else if(res.status === 400){
      setErrorMessage('Nueva contraseña inválida');
      console.log(errorMessage);
    } else {
      console.log('Parece que algo fue mal')
    }
  };

  return <form onSubmit={handlePassword} className="profile-form profile-password">
    <h3 className="profile-update-section-title">Contraseña</h3>

    <label htmlFor="old-password">Contraseña Actual</label>
      <div className="old-password">
        <FontAwesomeIcon icon={faUserLock}></FontAwesomeIcon>
        <input 
          id="old-password" 
          type="password"
          value={profilePassword.oldPassword}
          name="oldPassword"
          placeholder="***********"
          onChange={e => updateField(e, setProfilePassword, profilePassword)}
          />
      </div>
    <label htmlFor="new-password">Nueva Contraseña</label>
      <div className="new-password">
        <FontAwesomeIcon icon={faUnlock}></FontAwesomeIcon>
        <input 
          id="new-password" 
          type="password"
          value={profilePassword.newPassword}
          name="newPassword"
          onChange={e => updateField(e, setProfilePassword, profilePassword)}
          />
      </div>
    <label htmlFor="confirmed-new-password">Confirmar Contraseña</label>
      <div className="confirmed-new-password">
        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
        <input 
          id="confirmed-new-password" 
          type="password"
          value={profilePassword.repeatedNewPassword}
          name="repeatedNewPassword"
          onChange={e => updateField(e, setProfilePassword, profilePassword)}
          />
      </div>
      <button className="submit-button">Actualizar Contraseña</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
  </form>
}

export default ProfilePassword