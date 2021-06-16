import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';

function ReviewModal({ setShowReviewModal }) {
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
    } else if (res.status === 401) {
      setErrorMessage('Usuario o Contraseña incorrectos.');
      console.log(errorMessage);
    } else {
      console.log('Parece que algo fue mal');
    }
  };

  const handleClick = () => {
    setShowReviewModal(true);
  };

  const closeModalHandler = (e) => {
    setShowReviewModal(false);
  };

  return (
    <div className="login-bg" onClick={closeModalHandler}>
      <form
        className="login-fg"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="login-title">
          <FormattedMessage id="review.modal.title" />
        </h2>
        <div className="login-inputs">
          <label htmlFor="username-login">
            <FormattedMessage id="review.modal.note" />
          </label>
          <div className="login-field">
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            <input id="username-login" type="text" />
          </div>
          <label htmlFor="password-login">
            <FormattedMessage id="login.password" />
          </label>
          <div className="login-field">
            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
            <input
              id="password-login"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="login-button">
          <FormattedMessage id="review.modal.send" />
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>

      <FontAwesomeIcon
        className="login-exit"
        icon={faChevronUp}
        size="2x"
      ></FontAwesomeIcon>
    </div>
  );
}

export default ReviewModal;
