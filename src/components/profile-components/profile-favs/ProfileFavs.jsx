import { Redirect } from 'react-router';
import useFetch from '../../../hooks/useFetch';
import ProductCard from '../../ProductCard';

function ProfileFavs({user}) {

  const [favs] = useFetch(
    `http://localhost:8080/${user.userData.id}/getFavourites`,
    user
  );

  if (!Object.keys(user).length) {
    return <Redirect to="/" />;
  }

  return (
    <div className="profile-favs">
      <h2>Favoritos</h2>
      {!favs && <h3>Cargando...</h3>}
      {favs &&
        favs.length &&
        favs.map((f) => (
          <>
            <ProductCard data={f} />
          </>
        ))}
    </div>
  );
}

export default ProfileFavs;
