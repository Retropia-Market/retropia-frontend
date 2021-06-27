import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import BidCard from '../transaction-bid/BidCard';
import useFetch from '../../../../hooks/useFetch';

// /products/bid/user/:userId/completed

function TransactionBuy() {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const [results] = useFetch(
    `http://localhost:8080/products/bid/user/${user.userData.id}/completed/`,
    user
  );

  useEffect(() => {
    dispatch({ type: 'noti/sales', 'noti/sales': 0 });
    return () => {};
  }, [dispatch]);

  //   {/* {!Object.keys(results).length && <h3>Cargando...</h3>} */}
  return (
    <div className="bids-active">
      {results?.bids?.length === 0 && (
        <h3 className="transaction-empty">
          <FormattedMessage id="profile.purchases.notyet" />
        </h3>
      )}
      {results &&
        results.bids?.map((b) => {
          return (
            <>
              {' '}
              <BidCard
                key={b.product_id}
                className="completada"
                data={b}
                user={user}
                type="completada"
              />
            </>
          );
        })}
    </div>
  );
}

export default TransactionBuy;
