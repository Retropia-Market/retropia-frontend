import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faLock, faUser } from '@fortawesome/free-solid-svg-icons';

function Login({ setShowLogin, setShowRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(res);
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: 'LOGIN', user: data });
      setShowLogin(false);
    } else {
      alert('parece que algo salio mal');
    }
  };

  const handleClick = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  return (
    <div className="login-bg">
      <form className="login-fg" onSubmit={handleSubmit}>
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
        <img clasName="login-logo" src="" alt="logo" />
      </form>
      <FontAwesomeIcon
        className="login-exit"
        icon={faChevronUp}
        size="2x"
        onClick={() => setShowLogin(false)}
      ></FontAwesomeIcon>
      {/* <button className="login-exit" onClick={() => setShowLogin(false)}>X</button> */}
    </div>
  );
}

export default Login;
