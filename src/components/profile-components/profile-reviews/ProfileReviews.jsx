import { useState } from 'react';
import { Redirect } from 'react-router';
import MadeReviews from './MadeReviews';
import ReceivedReviews from './ReceivedReviews';

function ProfileReviews({user}) {
  const [section, setSection] = useState(false);

  if (!Object.keys(user).length) {
    return <Redirect to="/" />;
  }

  return (
    <div className="profile-reviews">
      <h2 className="title">
        <span className="tab" onClick={() => setSection(false)}>
          Valoraciones recibidas
        </span>
        <span className="tab-divider">|</span>
        <span className="tab" onClick={() => setSection(true)}>
          Valoraciones hechas
        </span>
      </h2>
      {section === false && <ReceivedReviews />}
      {section === true && <MadeReviews />}
    </div>
  );
}

export default ProfileReviews;
