import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import useFetch from '../../hooks/useFetch';
import productPlaceholder from '../../img/colorPlaceholder.svg';
import { useState } from 'react';
import NewBid from '../NewBid';
import { useSelector } from 'react-redux';
import GiveFavComponent from '../GiveFavComponent';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Link } from 'react-router-dom';


const ProductInfo = ({ data }) => {
  const [showBidModal, setShowBidModal] = useState(false);
  const {userData} = useSelector(s => s.user)

  const results = useFetch(
    `http://localhost:8080/user/${data?.seller_id}/rating`
  );

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
          <div
            className="product-img"
            style={{
              backgroundImage: data.images[0]?.url
                ? `url(http:/\/\localhost:8080/${data.images[0]?.url})`
                : `url(${productPlaceholder})`,
            }}
          >
          </div>
          <div className="product-info">
            <h3>{data.name}</h3>
            <div className="seller-info">
              <div className="seller-icon">
                <FontAwesomeIcon className="user-pic" icon={faUser}>
                  userIcon
                </FontAwesomeIcon>
              </div>
              <div className="seller-name"><Link to={`/users/${data.seller_id}`}>{data.seller}</Link></div>
              <div className="review-average">
                {results[0]?.review_average && <ReactStarsRating
                  value={+(results[0]?.review_average)}
                  isEdit={false}
                  isHalf={true}
                />}</div>
              <div className="total-review">{results.total_review}</div>
            </div>
            <div className="status-fav-price-bar">
              <div className="fav-status">
                <div>
                {userData ? (
                  <GiveFavComponent  data={data} />
                ) : (
                  ''
                )}
              </div>
                <span className="product-card-info-status">{data.status}</span>
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
            <div className="bid-message-buttons">
              <button className="button sell-button">
                <FormattedMessage id="button.message" />
              </button>
              <button onClick={handleBid} className="button bid-button">
                <FormattedMessage id="button.bid" />
              </button>
            </div>
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
    </>
  );
};

export default ProductInfo;
