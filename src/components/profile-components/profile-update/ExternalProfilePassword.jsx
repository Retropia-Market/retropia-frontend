import { useState } from "react";

import errorHandler from "../../../utils";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUnlock, faLock } from '@fortawesome/free-solid-svg-icons';

export function ExternalProfilePassword({updateField, user}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [profilePassword, setProfilePassword] = useState({
    newPassword: '',
    repeatedNewPassword: '',
  })

  const handlePassword = async e => {
    e.preventDefault();
    setErrorMessage('')
    const res = await fetch(`http://localhost:8080/users/${user.userData.id}/set-password`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profilePassword),
    });
    if(res.ok){
      setProfilePassword({
        newPassword: '',
        repeatedNewPassword: '',
      })
    }else{
      const data = await res.json();
      setErrorMessage(errorHandler(data.error))
    }
  }

  return <form onSubmit={handlePassword} className="profile-form profile-password">
    <h3 className="profile-update-section-title">Establezca su contraseña</h3>
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