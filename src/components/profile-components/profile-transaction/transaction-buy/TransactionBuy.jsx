import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BidCard from '../transaction-bid/BidCard';
import ReviewModal from './ReviewModal';

// /products/bid/user/:userId/completed

function TransactionBuy() {
  const user = useSelector((s) => s.user);
  const [bidsObject, setBidsObject] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `http://localhost:8080/products/bid/user/${user.userData.id}/completed/`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    if (res.ok) {
      const data = await res.json();
      setBidsObject(data);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
    return () => {};
  }, [fetchData]);

  return (
    <div className="bids-active">
      {showReviewModal && (
        <ReviewModal setShowReviewModal={setShowReviewModal} />
      )}
      {!Object.keys(bidsObject).length && <h3>Cargando...</h3>}

      {bidsObject.bids?.length === 0 && (
        <h3>Parece que aún no has completado ninguna compra.</h3>
      )}
      {bidsObject &&
        bidsObject.bids?.map((b) => {
          return (
            <BidCard
              className="completada"
              data={b}
              user={user}
              update={fetchData}
              showReviewModal={showReviewModal}
              setShowReviewModal={setShowReviewModal}
              type="completada"
            />
          );
        })}
    </div>
  );
}

export default TransactionBuy;
