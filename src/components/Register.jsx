import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faChevronUp,
  faEnvelope,
  faLock,
  faSignature,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

function Register({ setShowRegister, setShowLogin }) {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    repeatedPassword: '',
    birthDate: '',
  });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: 'LOGIN', user: data });
      console.log(data);

      setShowRegister(false);
    } else {
      alert('parece que algo salio mal');
      const data = await res.json();
      console.log(data);
    }
  };

  const handleClick = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const updateField = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="register-bg">
      <form className="register-fg" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>
        <div className="register-inputs">
          <div className="register-inputs-1">
            <label htmlFor="name-register">First Name</label>
            <div className="register-field">
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
            <div className="register-field">
              <FontAwesomeIcon icon={faSignature}></FontAwesomeIcon>
              <input
                id="last-name-register"
                type="text"
                value={userData.lastName}
                name="lastName"
                onChange={updateField}
              />
            </div>
            <label htmlFor="birth-date-register">Birth Date</label>
            <div className="register-field">
              <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>
              <input
                id="birth-date-register"
                type="date"
                value={userData.birthDate}
                name="birthDate"
                onChange={updateField}
              />
            </div>
          </div>
          <div className="register-inputs-2">
            <label htmlFor="username-register">Username</label>
            <div className="register-field">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              <input
                id="username-register"
                type="text"
                value={userData.username}
                name="username"
                onChange={updateField}
              />
            </div>
            <label htmlFor="email-register">Email</label>
            <div className="register-field">
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
            <div className="register-field">
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
            <div className="register-field">
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
        <button
          type="button"
          className="register-options"
          onClick={handleClick}
        >
          Ya tienes cuenta?
        </button>
        <button className="register-button">SIGN UP</button>
      </form>
      <FontAwesomeIcon
        className="register-exit"
        icon={faChevronUp}
        size="2x"
        onClick={() => setShowRegister(false)}
      ></FontAwesomeIcon>
      {/* <button onClick={() => setShowRegister(false)}>x</button> */}
    </div>
  );
}

export default Register;
