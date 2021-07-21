import { FormattedMessage } from 'react-intl';
import { Redirect } from 'react-router';
import useFetch from '../../../hooks/useFetch';
import ProductCard from '../../ProductCard';

function ProfileFavs({ user }) {
  const [favs] = useFetch(
    `http://15.188.133.89:8080/${user.userData.id}/getFavourites`,
    user
  );

  if (!Object.keys(user).length) {
    return <Redirect to="/" />;
  }

  return (
    <div className="catalogue">
      <h2 className="main-title">
        <FormattedMessage id="fav.title" />
        <span className="main-title-row"></span>
      </h2>

      {!favs && <h3>Cargando...</h3>}
      <div className="catalogue-products">
        {favs &&
          favs.length &&
          favs.map((f) => (
            <>
              <ProductCard data={f} />
            </>
          ))}
      </div>
    </div>
  );
}

export default ProfileFavs;
