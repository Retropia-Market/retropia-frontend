import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router';
import MadeReviews from './MadeReviews';
import ReceivedReviews from './ReceivedReviews';

function ProfileReviews({ user }) {
    const [section, setSection] = useState(false);

    if (!Object.keys(user).length) {
        return <Redirect to="/" />;
    }

    return (
        <div className="profile-reviews">
            <h2 className="main-title">
                <span className="tab" onClick={() => setSection(false)}>
                    <FormattedMessage id="profile.reviews.received.title" />
                </span>
                <span className="tab-divider"> | </span>
                <span className="tab" onClick={() => setSection(true)}>
                    <FormattedMessage id="profile.reviews.done.title" />
                </span>
            </h2>
            <div className="review-section">
                {section === false && <ReceivedReviews />}
                {section === true && <MadeReviews />}
            </div>
        </div>
    );
}

export default ProfileReviews;
