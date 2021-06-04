import { useSelector } from 'react-redux'

import ProfileData from './ProfileData'
import ProfilePassword from './ProfilePassword'
import ProfileImg from './ProfileImg'

function ProfileUpdate() {

  const user = useSelector(s => s.user)

  const updateField = (e, setData, data) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  if(!user) {
    return <div>no user found</div>
  }

  return <div className="profile-update">
    <h2>Gestion de perfil</h2>
    <ProfileImg loggedUser={user}/>
    <ProfileData updateField={updateField} user={user}/>
    <ProfilePassword updateField={updateField} user={user}/>
  </div>
}

export default ProfileUpdate