import useFetch from '../../hooks/useFetch';
import ReactStarsRating from 'react-awesome-stars-rating';
import { useDispatch, useSelector } from 'react-redux';
import Location from '../Location';
import banner from '../../img/banner-placeholder.jpeg';
import logo from '../../img/placeholder-logo.png';

const UserPublicData = ({ uid }) => {
  const user = useSelector((s) => s.user);
  const apiURL = 'http://localhost:8080/users/' + uid;
  const dispatch = useDispatch();
  const [results] = useFetch(apiURL);
  const [ratings] = useFetch(`http://localhost:8080/user/${uid}/rating`);
  const bannerUrl = `http://localhost:8080${
    user?.userData?.banner ?? results?.banner
  }`;

  const userImg =
    results?.image?.indexOf('google') !== -1
      ? results?.image
      : `http:\/\/localhost:8080/${results?.image.slice(11)}`;

  const handleClick = async (e) => {
    const fd = new FormData();
    fd.append('banner', e.target.files[0]);
    const res = await fetch(`http://localhost:8080/users/update-banner`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
      body: fd,
    });
    if (res.ok) {
      const data = await res.json();
      alert('Banner cambiado!');
      dispatch({
        type: 'UPDATE',
        data: { banner: data?.url },
      });
    } else {
      const data = await res.json();
      alert(data);
    }
  };

  return (
    <>
      {results && (
        <div className="user-public-data">
          <div
            className="public-avatar-background"
            style={{
              backgroundImage: `url(${results?.banner ? bannerUrl : banner})`,
            }}
          ></div>
          {+uid === user?.userData?.id && (
            <div className="update-banner-div">
              <label className="update-banner">
                <input type="file" onChange={(e) => handleClick(e)} />
              </label>
            </div>
          )}

          <div
            className="public-avatar"
            style={{
              backgroundImage: `url(${results?.image ? userImg : logo})`,
            }}
          ></div>
          <div className="user-public-info">
            <div className="username-stars">
              <div className="username">{results?.username}</div>
              <div className="reviews-info">
                <div className="review-average">
                  <ReactStarsRating
                    className="react-stars"
                    value={
                      +ratings?.review_average > 0
                        ? +ratings?.review_average
                        : 0
                    }
                    isEdit={false}
                    isHalf={true}
                  />
                </div>
                <div className="rating-number">
                  ({ratings?.total_review ?? '0'})
                </div>
              </div>
            </div>
            <Location place={results?.location} className="user-location" />
          </div>
        </div>
      )}
    </>
  );
};

export default UserPublicData;
