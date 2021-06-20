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
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await fetch('http://localhost:8080/users/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-Type': 'application/json' },
        });
        if (res.ok) {
            setSubmitted(true);
        } else {
            const data = await res.json();
            setError(errorHandler(data.error));
        }
    };

    const handleClick = () => {
        setShowRegister(false);
        setSubmitted(false);
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
                    <h2 className="modal-title">
                        <FormattedMessage id="register.register" />
                    </h2>
                    <div className="modal-inputs-container">
                        <div className="modal-inputs">
                            <label htmlFor="name-register">
                                <FormattedMessage id="register.firstname" />
                            </label>
                            <div className="modal-field">
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
                            <div className="modal-field">
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
                            <label htmlFor="username-register">
                                <FormattedMessage id="register.username" />
                            </label>
                            <div className="modal-field">
                                <FontAwesomeIcon
                                    icon={faUser}
                                ></FontAwesomeIcon>
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
                            <label htmlFor="email-register">
                                <FormattedMessage id="profile.update.email" />
                            </label>
                            <div className="modal-field">
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
                                <FormattedMessage id="login.passord" />
                            </label>
                            <div className="modal-field">
                                <FontAwesomeIcon
                                    icon={faLock}
                                ></FontAwesomeIcon>
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
                            <div className="modal-field">
                                <FontAwesomeIcon
                                    icon={faLock}
                                ></FontAwesomeIcon>
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
                            <FormattedMessage id="register.alreadyaccount" />
                        </button>
                    </div>
                    <button className="modal-button">
                        <FormattedMessage id="register.registernow" />
                    </button>
                </form>
                {submitted && (
                    <p className="modal-submitted">
                        <FormattedMessage id="register.checkemail" />
                    </p>
                )}
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
