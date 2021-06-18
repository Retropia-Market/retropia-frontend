import { useState } from "react";
import { useParams } from "react-router";
import {useHistory } from 'react-router-dom'

import errorHandler from "../../../utils";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export function PassReset() {
  const [newPassword, setNewPassword] = useState('')
  const [newRepPassword, setNewRepPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [resetMessage, showResetMessage] = useState(false)
  const {token} = useParams()
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8080/users/password-reset/${token}`, {
      method: 'POST',
      body: JSON.stringify({
        newPassword: newPassword,
        newRepPassword: newRepPassword,
      }),
      headers: {'Content-Type': 'application/Json'}
    })
    if(res.ok){
      showResetMessage(true)
      setTimeout(() => {
        history.push('/')
      }, 1000);
    }else{
      const data = await res.json();
      setErrorMessage(errorHandler(data.error))
    }
  }

  return <>
    {!resetMessage && <div className="modal-bg"
    >
      <div className="modal-fg">
        <form onSubmit={handleSubmit}>
            <h2 className="modal-title">Password Reset</h2>
            <div className="modal-inputs">
              <label htmlFor="new_password">new password</label>
              <div className="modal-field">
                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                <input
                  id="new_password"
                  type="password"
                  placeholder="************"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <label htmlFor="new_rep_password">repeat password</label>
              <div className="modal-field">
                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                <input
                  id="new_rep_password"
                  type="password"
                  placeholder="************"
                  value={newRepPassword}
                  onChange={(e) => setNewRepPassword(e.target.value)}
                />
              </div>
            </div>
            <button className="modal-button">RESET PASSWORD</button>
        </form>

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>}
    {resetMessage && <p className="modal-submitted">password reset succesfully</p>}
  </>
}