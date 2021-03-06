import { useState } from 'react';
import { useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import { PassRecovery } from './PassRecovery';

function Login({ setShowLogin, setShowRegister }) {
  const [showPassRec, setShowPassRec] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = await fetch('https://api.retropia-market.com/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const user = await res.json();
      if (user.userData.verified) {
        dispatch({ type: 'LOGIN', user });
        setShowLogin(false);
      } else {
        setErrorMessage(
          'Este email no esta verificado. Por favor revisa tu bandeja de correo'
        );
      }
    } else if (res.status === 401) {
      setErrorMessage('Usuario o Contraseña incorrectos.');
    } else {
      console.log('Parece que algo fue mal');
    }
  };

  const handleGoogleLogin = async (googleData) => {
    const res = await fetch(
      'https://api.retropia-market.com/users/login-google',
      {
        method: 'POST',
        body: JSON.stringify({
          token: googleData.tokenId,
        }),
        headers: {
          'content-type': 'application/json',
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: 'LOGIN', user: data });
      setShowLogin(false);
    }
  };

  const handleRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };
  const handleRecovery = () => {
    setShowPassRec(true);
  };

  const closeModalHandler = (e) => {
    setShowLogin(false);
  };

  return (
    <div className="modal-bg" id="login-bg" onClick={closeModalHandler}>
      <div
        className="modal-fg"
        id="login-fg"
        onClick={(e) => e.stopPropagation()}
      >
        {!showPassRec && (
          <form onSubmit={handleSubmit}>
            <h2 className="modal-title">
              <FormattedMessage id="login.login" />
            </h2>
            <div className="modal-inputs">
              <label htmlFor="username-login">
                {' '}
                <FormattedMessage id="login.user" />
              </label>
              <div className="modal-field">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                <input
                  id="username-login"
                  type="email"
                  placeholder="email..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <label htmlFor="password-login">
                {' '}
                <FormattedMessage id="login.password" />
              </label>
              <div className="modal-field">
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

            <div className="modal-options-container">
              <button
                type="button"
                className="modal-options"
                onClick={handleRegister}
              >
                <FormattedMessage id="login.notaccount" />
              </button>
              <button
                type="button"
                className="modal-options"
                onClick={handleRecovery}
              >
                <FormattedMessage id="login.forgot" />
              </button>
            </div>

            <button className="submit-button-1">
              {' '}
              <FormattedMessage id="login.login" />
            </button>
            <div className="google-button">
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                // buttonText="Log in"
                onSuccess={handleGoogleLogin}
                onFailure={handleGoogleLogin}
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </form>
        )}

        {showPassRec && (
          <PassRecovery
            setShow={setShowPassRec}
            setErrorMessage={setErrorMessage}
          />
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>

      <FontAwesomeIcon
        className="modal-exit"
        icon={faChevronUp}
        onClick={() => setShowLogin(false)}
      ></FontAwesomeIcon>
    </div>
  );
}

export default Login;
