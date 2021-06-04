import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import ProductCard from '../../ProductCard';

function ProfileFavs() {
  const user = useSelector((s) => s.user);

  const [favs] = useFetch(
    `http://localhost:8080/${user.userData.id}/getFavourites`,
    user
  );
  console.log(favs);

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
