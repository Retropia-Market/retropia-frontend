import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import useFetch from '../../hooks/useFetch';
import productPlaceholder from '../../img/colorPlaceholder.svg';
import { useState } from 'react';
import NewBid from '../NewBid';
import { useDispatch, useSelector } from 'react-redux';
import GiveFavComponent from '../GiveFavComponent';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Link, useHistory } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import ProductCardStatus from '../ProductCardStatus';
import Login from '../profile-components/profile-authentication/Login';
import Register from '../profile-components/profile-authentication/Register';

const ProductInfo = ({ data, metacritic }) => {
  const [showBidModal, setShowBidModal] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { userData } = useSelector((s) => s.user);

  const results = useFetch(
    `http://localhost:8080/user/${data?.seller_id}/rating`
  );

  const history = useHistory();
  const contacts = useSelector((s) => s.contacts);
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const chatClickHandler = async (e) => {
    if (!contacts[data.seller_id]) {
      const res = await fetch(
        `http://localhost:8080/chats/${user.userData.id}/add-contact/${data.seller_id}`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + user.token,
          },
        }
      );
      if (res.ok) {
        const data_ok = await res.json();
        dispatch({ type: 'ADD-CONTACT', data: data_ok.contact });
      } else {
        // TODO: configurar errores
        console.error('error inesperado');
      }
    }
    history.push(`/profile/chat/${data.seller_id}`);
  };

  if (data?.error) {
    return (
      <div>
        <h1>El producto no existe</h1>
      </div>
    );
  }

  const handleBid = () => {
    setShowBidModal(!showBidModal);
  };

  return (
    <>
      {data && (
        <div className="product-main-page">
          <ImageGallery
            items={data.images.map((p) => {
              return {
                original: `http:/\/\localhost:8080/${p.url}`,
                thumbnail: `http:/\/\localhost:8080/${p.url}`,
                originalHeight: 300,
              };
            })}
          />
          <div className="product-info">
            <div className="name-metacritic">
              <span className="product-title">{data.name}</span>
              {metacritic && (
                <div className="metacritic">
                  <div className="logo"></div>
                  <span
                    className={`metacritic-score ${
                      metacritic > 60
                        ? 'meta-green'
                        : metacritic > 39
                        ? 'meta-yellow'
                        : 'meta-red'
                    }`}
                  >
                    {metacritic}
                  </span>
                </div>
              )}
            </div>
            <div className="seller-info">
              <div className="icon-name">
                <div className="seller-icon">
                  <FontAwesomeIcon className="user-pic" icon={faUser}>
                    userIcon
                  </FontAwesomeIcon>
                </div>
                <div className="seller-name">
                  <Link to={`/users/${data.seller_id}`}>{data.seller}</Link>
                </div>
              </div>
              <div className="reviews-component">
                <div className="review-average">
                  <ReactStarsRating
                    value={
                      +results[0]?.review_average > 0
                        ? +results[0]?.review_average
                        : 0
                    }
                    isEdit={false}
                    isHalf={true}
                  />
                </div>

                <span className="total-review">
                  ({results[0]?.total_review})
                </span>
              </div>
            </div>
            <div className="status-fav-price-bar">
              <div className="fav-status">
                <div className="status-text">
                  <FormattedMessage id="sale.productStatus" />:
                </div>
                <ProductCardStatus status={data.status} />
              </div>
              <div className="product-card-info-price">
                <FormattedNumber
                  style="currency"
                  value={data.price}
                  currency="EUR"
                />
              </div>
            </div>
            <div className="product-description">{data.description}</div>
            {user.userData && data.seller_id !== user.userData.id && (
              <div className="bid-message-buttons">
                <button
                  className="button sell-button"
                  onClick={chatClickHandler}
                >
                  <FormattedMessage id="button.message" />
                </button>
                <div>{userData ? <GiveFavComponent data={data} /> : ''}</div>
                <button onClick={handleBid} className="button bid-button">
                  <FormattedMessage id="button.bid" />
                </button>
              </div>
            )}
            {!user.userData && (
              <div className="bid-message-buttons">
                <button
                  className="button sell-button"
                  onClick={() => setShowLogin(true)}
                >
                  <FormattedMessage id="button.message" />
                </button>
                <div>{userData ? <GiveFavComponent data={data} /> : ''}</div>
                <button
                  onClick={() => setShowLogin(true)}
                  className="button bid-button"
                >
                  <FormattedMessage id="button.bid" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {showBidModal && (
        <NewBid
          id={data.id}
          showBidModal={showBidModal}
          setShowBidModal={setShowBidModal}
        />
      )}
      {showLogin && (
        <Login setShowLogin={setShowLogin} setShowRegister={setShowRegister} />
      )}
      {showRegister && (
        <Register
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
        />
      )}
    </>
  );
};

export default ProductInfo;
