import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';

import colorHeart from '../img/icons/heart-color-icon.svg';
import greyHeart from '../img/icons/heart-grey-icon.svg';

const GiveFavComponent = ({ data }) => {
  const user = useSelector((s) => s.user);

  const apiFavURL = `http://15.188.133.89:8080/${user.userData.id}/getFavourites/`;

  const [favorites] = useFetch(apiFavURL, user);
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (favorites) {
      const getFav = favorites.map((prod) => prod.id);
      getFav.forEach((id) => {
        if (id === data.id) setFav(true);
      });
    }
  }, [favorites, data.id]);

  const handleFav = async () => {
    if (!fav) {
      const ret = await fetch(
        `http://15.188.133.89:8080/${data.id}/addFavourite/${user.userData.id}`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      );
      if (ret.ok) {
        setFav(true);
      }
    } else {
      const ret = await fetch(
        `http://15.188.133.89:8080/${data.id}/removeFavourite/${user.userData.id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      );
      if (ret.ok) {
        setFav(false);
      }
    }
  };
  return (
    <div
      className="heart-icon"
      onClick={handleFav}
      style={{
        background: fav
          ? `url(${colorHeart}) no-repeat`
          : `url(${greyHeart}) no-repeat`,
      }}
    ></div>
  );
};

export default GiveFavComponent;
