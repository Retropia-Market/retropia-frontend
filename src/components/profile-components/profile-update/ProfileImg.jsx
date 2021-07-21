import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

function ProfileImg({ user }) {
  const defaultImg = 'https://i.imgur.com/CevZ3gf.jpg';
  let userImg = null;
  const { userData } = user;

  if (userData.image) {
    userData.image.includes('google')
      ? (userImg = userData.image)
      : (userImg = 'http://15.188.133.89:8080/' + userData.image.slice(11));
  }

  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [preview, setPreview] = useState(userImg || defaultImg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('userImg', file);
    const res = await fetch(
      `http://15.188.133.89:8080/users/${userData.id}/update-img`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + user.token,
        },
        body: fd,
      }
    );
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: 'UPDATE', data });
    } else {
      console.error(
        'estatus de respuesta: ',
        res.status,
        ' mensaje: ',
        res.statusText
      );
    }
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : userImg || defaultImg);
  };

  return (
    <form className="profile-img profile-form" onSubmit={handleSubmit}>
      <h3 className="profile-update-section-title">
        <FormattedMessage id="profile.update.profilephoto" />
      </h3>
      <div className="profile-update-image">
        <label>
          <div
            className="avatar"
            style={preview && { backgroundImage: `url(${preview})` }}
          />
          <input onChange={handleFile} type="file" />
        </label>
      </div>
      <button className="submit-button-1 profile-update-button">
        Actualizar Imagen
      </button>
    </form>
  );
}

export default ProfileImg;
