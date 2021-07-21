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
  const [showCard, setShowCard] = useState(true);

  useEffect(() => {
    const fetchProduct = async (product_id) => {
      const res = await fetch(
        `https://api.retropia-market.com/catalogue/${product_id}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      if (res.ok) {
        const dataRes = await res.json();
        setProduct(dataRes);
      }
    };

    const fetchUser = async (user_id) => {
      const res = await fetch(
        `https://api.retropia-market.com/users/${user_id}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + user.token,
            'Content-Type': 'application/json',
          },
        }
      );
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
      `https://api.retropia-market.com/products/bid/${data.id}/delete`,
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
      `https://api.retropia-market.com/products/bid/${data.id}/accept`,
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
    `https://api.retropia-market.com/catalogue/${data.product_id}/review/`,
    user
  );
  console.log(data);
  return (
    <>
      {resultsReviews?.error && showCard && (
        <div className={`bid ${className}`}>
          {product.id && <ProductCard data={product} />}
          <div className={`bid-card`}>
            <div className="bid-message">
              <h2 className="bid-card-message-title">
                <FormattedMessage id="offer.details"></FormattedMessage>
              </h2>
              {data.sale_status === 'vendido' ? (
                ''
              ) : (
                <>
                  <h2 className="bid-card-message-sub-title">
                    <FormattedMessage
                      id={
                        type === 'realizada'
                          ? 'profile.bids.message.to.seller'
                          : type === 'recibida'
                          ? 'profile.bids.message.from.buyer'
                          : 'profile.bids.message.to.seller'
                      }
                    />
                  </h2>
                  <h3 className="bid-card-message-text">{data.bid_message}</h3>
                </>
              )}
            </div>
            <div className="bottom">
              <div className="bid-price">
                <h2 className="bid-card-price-title">
                  {' '}
                  <FormattedMessage
                    id={
                      type === 'realizada'
                        ? 'profile.bids.offer.to.seller'
                        : type === 'recibida'
                        ? 'profile.bids.offer.from.buyer'
                        : 'profile.bids.total.paid'
                    }
                  />
                  :
                </h2>
                <h3 className="bid-card-price-amount">
                  <FormattedNumber
                    style="currency"
                    value={data.bid_price}
                    currency="EUR"
                  />
                </h3>
              </div>
              <div className="bid-card-general-icons">
                <div className="bid-card-owner-icons">
                  {bidder.id && <h3>{bidder.username}</h3>}
                  {type === 'recibida' && (
                    <button className="submit-button-1" onClick={handleAccept}>
                      {' '}
                      <FormattedMessage id="profile.bids.acceptoffer" />
                    </button>
                  )}
                  {type === 'realizada' && (
                    <div className="bid-card-button" onClick={handleDelete}>
                      <FontAwesomeIcon
                        className="delete-icon"
                        icon={faTrashAlt}
                      >
                        Delete
                      </FontAwesomeIcon>
                    </div>
                  )}
                  {type === 'completada' && (
                    <button
                      className="submit-button-1 review-button"
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
          </div>
        </div>
      )}
      {showReviewModal && (
        <ReviewModal
          data={data}
          setShowCard={setShowCard}
          setShowReviewModal={setShowReviewModal}
        />
      )}
    </>
  );
}

export default BidCard;
