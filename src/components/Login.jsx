import { useState } from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

function Login({ setShowLogin, setShowRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: 'LOGIN', user: data });
      setShowLogin(false);
    } else if(res.status === 401){
      setErrorMessage('Usuario o Contraseña incorrectos.');
      console.log(errorMessage);
    } else {
      console.log('Parece que algo fue mal')
    }
  };

  const handleGoogleLogin = async googleData => {
    const res = await fetch("http://localhost:8080/users/login-google", {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "content-type": "application/json"
      }
    }); if (res.ok){
      const data = await res.json()
      dispatch({ type: 'LOGIN', user: data });
      setShowLogin(false);
    }
  }

  const handleClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const closeModalHandler = (e) => {
    setShowLogin(false);
  };

  return (
    <div className="login-bg" onClick={closeModalHandler}>
      <form
        className="login-fg"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="login-title">Login</h2>
        <div className="login-inputs">
          <label htmlFor="username-login">User</label>
          <div className="login-field">
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            <input
              id="username-login"
              type="text"
              placeholder="email..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <label htmlFor="password-login">Password</label>
          <div className="login-field">
            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
            <input
              id="password-login"
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="login-options">
          <button type="button" className="login-options" onClick={handleClick}>
            ¿No tienes cuenta?
          </button>
          <button type="button" className="login-options">
            ¿Olvidaste tu clave?
          </button>
        </div>

        <button className="login-button">LOG IN</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <GoogleLogin 
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} 
          // buttonText="Log in" 
          onSuccess={handleGoogleLogin} 
          onFailure={handleGoogleLogin} 
          cookiePolicy={'single_host_origin'} 
        />
      </form>


      <FontAwesomeIcon
        className="login-exit"
        icon={faChevronUp}
        size="2x"
        onClick={() => setShowLogin(false)}
      ></FontAwesomeIcon>
    </div>
  );
}

export default Login;
