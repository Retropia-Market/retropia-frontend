import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faEnvelope,
  faLock,
  faSignature,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import errorHandler from '../../../utils';

function Register({ setShowRegister, setShowLogin }) {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    repeatedPassword: '',
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('http://localhost:8080/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      setSubmitted(true)
    } else {
      const data = await res.json();
      setError(errorHandler(data.error));
    }
  };

  const handleClick = () => {
    setShowRegister(false);
    setSubmitted(false)
    setShowLogin(true);
  };

  const updateField = (e) => {
      setUserData({
          ...userData,
          [e.target.name]: e.target.value,
      });
  };
  const closeModalHandler = (e) => {
      setShowRegister(false);
  };

  return (
    <div className="modal-bg" onClick={closeModalHandler}>
      <div 
        className="modal-fg"
        id="register-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <form onSubmit={handleSubmit}>
          <h2 className="modal-title">Register</h2>
            <div className="modal-inputs-container">
              <div className="modal-inputs">
                  <label htmlFor="name-register">First Name</label>
                  <div className="modal-field">
                    <FontAwesomeIcon icon={faSignature}></FontAwesomeIcon>
                    <input
                      id="name-register"
                      type="text"
                      value={userData.firstName}
                      name="firstName"
                      onChange={updateField}
                    />
                  </div>
                  <label htmlFor="last-name-register">Last Name</label>
                  <div className="modal-field">
                    <FontAwesomeIcon icon={faSignature}></FontAwesomeIcon>
                    <input
                      id="last-name-register"
                      type="text"
                      value={userData.lastName}
                      name="lastName"
                      onChange={updateField}
                    />
                  </div>
                  <label htmlFor="username-register">Username</label>
                  <div className="modal-field">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    <input
                      id="username-register"
                      type="text"
                      value={userData.username}
                      name="username"
                      onChange={updateField}
                    />
                  </div>
                </div>
                <div className="modal-inputs">
                  <label htmlFor="email-register">Email</label>
                  <div className="modal-field">
                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                    <input
                      id="email-register"
                      type="text"
                      value={userData.email}
                      name="email"
                      onChange={updateField}
                    />
                  </div>
                  <label htmlFor="password-register">Password</label>
                  <div className="modal-field">
                    <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                    <input
                      id="password-register"
                      type="password"
                      value={userData.password}
                      name="password"
                      onChange={updateField}
                    />
                  </div>
                  <label htmlFor="repeated-password-register">Repeat password</label>
                  <div className="modal-field">
                    <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                    <input
                      id="repeated-password-register"
                      type="password"
                      value={userData.repeatedPassword}
                      name="repeatedPassword"
                      onChange={updateField}
                    />
                  </div>
                </div>
             </div>
            <div className="modal-options-container">
              <button
                type="button"
                className="modal-options"
                onClick={handleClick}
              >
                Ya tienes cuenta?
              </button>
            </div>
          <button className="modal-button">SIGN UP</button>
        </form>
        {submitted && <p className="modal-submitted">
          Please check your email inbox to verify your account
        </p> }
        {error && (
          <div className="error-message">
            <FormattedMessage id={error} />
          </div>
        )}
      </div>
      <FontAwesomeIcon
        className="modal-exit"
        icon={faChevronUp}
        size="2x"
        onClick={() => setShowRegister(false)}
      ></FontAwesomeIcon>
    </div>
  );
}

export default Register;
