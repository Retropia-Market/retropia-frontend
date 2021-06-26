import React, { useEffect, useState } from 'react';
import ProductCard from '../../../ProductCard';
import { faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useFetch from '../../../../hooks/useFetch';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import ReviewModal from '../transaction-buy/ReviewModal';

function BidCard({ data, user, update, type, className }) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [product, setProduct] = useState({});
  const [bidder, setBidder] = useState({});

  useEffect(() => {
    const fetchProduct = async (product_id) => {
      const res = await fetch(`http://localhost:8080/catalogue/${product_id}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok) {
        const dataRes = await res.json();
        setProduct(dataRes);
      }
    };

    const fetchUser = async (user_id) => {
      const res = await fetch(`http://localhost:8080/users/${user_id}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + user.token,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const dataRes = await res.json();
        setBidder(dataRes);
      }
    };

    fetchProduct(data.product_id);
    fetchUser(data.user_id);
    return () => {};
  }, [data]);

  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:8080/products/bid/${data.id}/delete`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + user.token,
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      update();
    } else {
      const data = await res.json();
    }
  };

  const handleAccept = async () => {
    const res = await fetch(
      `http://localhost:8080/products/bid/${data.id}/accept`,
      {
        method: 'PATCH',
        headers: {
          Authorization: 'Bearer ' + user.token,
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      update();
    } else {
      const data = await res.json();
    }
  };

  const handleReview = async () => {
    setShowReviewModal(true);
  };

  const [resultsReviews] = useFetch(
    `http://localhost:8080/catalogue/${data.product_id}/review/`,
    user
  );

  return (
    <>
      {resultsReviews?.error && (
        <div className={`bid ${className}`}>
          {product.id && <ProductCard data={product} />}
          <div className={`bid-card`}>
            <div className="bid-message">
              <h2 className="bid-card-message-tilte">
                <FormattedMessage id="profile.bids.message" />
              </h2>
              <h3 className="bid-card-message-text">{data.bid_message}</h3>
            </div>
            <div className="bid-price">
              <h2 className="bid-card-price-tilte">
                {' '}
                <FormattedMessage id="profile.bids.offer" />:
              </h2>
              <h3 className="bid-card-price-amount">
                <FormattedNumber
                  style="currency"
                  value={data.bid_price}
                  currency="EUR"
                />
              </h3>
            </div>
            <div className="buttons">
              {bidder.id && <h3>{bidder.username}</h3>}
              {type === 'recibida' && (
                <button onClick={handleAccept}>
                  {' '}
                  <FormattedMessage id="profile.bids.acceptoffer" />
                </button>
              )}
              {type === 'realizada' && (
                <button className="bid-card-button" onClick={handleDelete}>
                  <FontAwesomeIcon className="delete-icon" icon={faTrashAlt}>
                    Delete
                  </FontAwesomeIcon>
                </button>
              )}
              {type === 'completada' && (
                <button
                  className="submit-button-1"
                  id=""
                  onClick={handleReview}
                >
                  {' '}
                  <FontAwesomeIcon
                    id="review-stars"
                    className="review-star"
                    icon={faStar}
                  ></FontAwesomeIcon>
                  <FormattedMessage id="profile.bids.review" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {showReviewModal && (
        <ReviewModal data={data} setShowReviewModal={setShowReviewModal} />
      )}
    </>
  );
}

export default BidCard;
