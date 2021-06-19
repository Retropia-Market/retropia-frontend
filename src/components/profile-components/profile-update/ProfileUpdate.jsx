import { Redirect } from 'react-router';

import ProfileData from './ProfileData'
import ProfilePassword from './ProfilePassword'
import ProfileImg from './ProfileImg'
import { ExternalProfilePassword } from './ExternalProfilePassword';

function ProfileUpdate({user}) {

  const updateField = (e, setData, data) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  if (!Object.keys(user).length) {
    return <Redirect to="/" />;
  }

  return <div className="profile-update">
    <h2>Gestion de perfil</h2>
    <ProfileImg user={user}/>
    <ProfileData updateField={updateField} user={user}/>
    {!user.userData.externalUser && 
      <ProfilePassword updateField={updateField} user={user}/>}
    {user.userData.externalUser &&
      <ExternalProfilePassword updateField={updateField} user={user}/>
    }
  </div>
}

export default ProfileUpdate