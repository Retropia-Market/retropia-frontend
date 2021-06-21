import { useState } from 'react';

import errorHandler from '../../../utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';

export function ExternalProfilePassword({ updateField, user }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [profilePassword, setProfilePassword] = useState({
        newPassword: '',
        repeatedNewPassword: '',
    });

    const handlePassword = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const res = await fetch(
            `http://localhost:8080/users/${user.userData.id}/set-password`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profilePassword),
            }
        );
        if (res.ok) {
            setProfilePassword({
                newPassword: '',
                repeatedNewPassword: '',
            });
        } else {
            const data = await res.json();
            setErrorMessage(errorHandler(data.error));
        }
    };

    return (
        <form
            onSubmit={handlePassword}
            className="profile-form profile-password"
        >
            <h3 className="profile-update-section-title">
                <FormattedMessage id="profile.update.establishpassword" />
            </h3>

            <div className="profile-update-fields">
                <div className="profile-update-field">
                    <label 
                        className="profile-update-field-label" 
                        htmlFor="new-password"
                    >
                        <FormattedMessage id="profile.update.newpassword" />
                    </label>
                    <div className="profile-update-input">
                        <FontAwesomeIcon icon={faUnlock}></FontAwesomeIcon>
                        <input
                            id="new-password"
                            type="password"
                            value={profilePassword.newPassword}
                            name="newPassword"
                            onChange={(e) =>
                                updateField(e, setProfilePassword, profilePassword)
                            }
                        />
                    </div>
                </div>
                <div className="profile-update-field">
                    <label 
                        className="profile-update-field-label" 
                        htmlFor="confirmed-new-password"
                    >
                        <FormattedMessage id="profile.update.confirmpassword" />
                    </label>
                    <div className="profile-update-input">
                        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                        <input
                            id="confirmed-new-password"
                            type="password"
                            value={profilePassword.repeatedNewPassword}
                            name="repeatedNewPassword"
                            onChange={(e) =>
                                updateField(e, setProfilePassword, profilePassword)
                            }
                        />
                    </div>
                </div>
            </div>
            <button className="submit-button-1 profile-update-button">
                <FormattedMessage id="profile.update.updatepassword" />
            </button>
            {errorMessage && (
                <div className="error-message">{errorMessage}</div>
            )}
        </form>
    );
}
