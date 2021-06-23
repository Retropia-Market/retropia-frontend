import React, { useEffect, useState, useCallback } from 'react';
import ProductCard from '../../../ProductCard';
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
    console.log(resultsReviews);
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
            <h2>DEV_Estado:</h2>
            <h3>{className}</h3>
            <h2>
              <FormattedMessage id="profile.bids.message" />
            </h2>
            <h3>{data.bid_message}</h3>
            <h2>
              {' '}
              <FormattedMessage id="profile.bids.offer" />:
            </h2>
            <h3>
              <FormattedNumber
                style="currency"
                value={data.bid_price}
                currency="EUR"
              />
            </h3>
            <div className="buttons">
              {bidder.id && <h3>{bidder.username}</h3>}
              {type === 'recibida' && (
                <button onClick={handleAccept}>
                  {' '}
                  <FormattedMessage id="profile.bids.acceptoffer" />
                </button>
              )}
              {type === 'realizada' && (
                <button onClick={handleDelete}>X</button>
              )}
              {type === 'completada' && (
                <button onClick={handleReview}>
                  {' '}
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
