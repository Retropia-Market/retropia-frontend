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
import { FormattedMessage } from 'react-intl';
import errorHandler from '../utils';

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
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
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
            const data = await res.json();
            console.log(data.error);
            setError(errorHandler(data.error));
            console.log(error);
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
    const closeModalHandler = (e) => {
        setShowRegister(false);
    };

    return (
        <div className="register-bg" onClick={closeModalHandler}>
            <form
                className="register-fg"
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="register-title">
                    <FormattedMessage id="register.register" />
                </h2>
                <div className="register-inputs">
                    <div className="register-inputs-1">
                        <label htmlFor="name-register">
                            <FormattedMessage id="register.firstname" />
                        </label>
                        <div className="register-field">
                            <FontAwesomeIcon
                                icon={faSignature}
                            ></FontAwesomeIcon>
                            <input
                                id="name-register"
                                type="text"
                                value={userData.firstName}
                                name="firstName"
                                onChange={updateField}
                            />
                        </div>
                        <label htmlFor="last-name-register">
                            <FormattedMessage id="register.lastname" />
                        </label>
                        <div className="register-field">
                            <FontAwesomeIcon
                                icon={faSignature}
                            ></FontAwesomeIcon>
                            <input
                                id="last-name-register"
                                type="text"
                                value={userData.lastName}
                                name="lastName"
                                onChange={updateField}
                            />
                        </div>
                        <label htmlFor="birth-date-register">
                            <FormattedMessage id="register.birthdate" />
                        </label>
                        <div className="register-field">
                            <FontAwesomeIcon
                                icon={faCalendarAlt}
                            ></FontAwesomeIcon>
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
                        <label htmlFor="username-register">
                            <FormattedMessage id="register.username" />
                        </label>
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
                        <label htmlFor="email-register">
                            <FormattedMessage id="login.user" />
                        </label>
                        <div className="register-field">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                            ></FontAwesomeIcon>
                            <input
                                id="email-register"
                                type="text"
                                value={userData.email}
                                name="email"
                                onChange={updateField}
                            />
                        </div>
                        <label htmlFor="password-register">
                            <FormattedMessage id="login.password" />
                        </label>
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
                        <label htmlFor="repeated-password-register">
                            <FormattedMessage id="register.repeatpassword" />
                        </label>
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
                    <FormattedMessage id="register.alreadyaccount" />
                </button>
                <button className="register-button">
                    <FormattedMessage id="register.registernow" />
                </button>
                {error && (
                    <div className="error-message">
                        <FormattedMessage id={error} />
                    </div>
                )}
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
