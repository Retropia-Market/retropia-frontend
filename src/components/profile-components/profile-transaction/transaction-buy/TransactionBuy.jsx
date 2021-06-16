import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BidCard from '../transaction-bid/BidCard';

// /products/bid/user/:userId/completed

function TransactionBuy() {
  const user = useSelector((s) => s.user);
  const [bidsObject, setBidsObject] = useState({});

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
      {!Object.keys(bidsObject).length && <h3>Cargando...</h3>}

      {bidsObject.bids?.length === 0 && (
        <h3>Parece que aún no has recibido ofertas.</h3>
      )}
      {bidsObject &&
        bidsObject.bids?.map((b) => {
          if (b.bid_status === 'aceptado' || b.bid_status === 'rechazado') {
            return console.log(b);
          } else {
            return (
              <BidCard
                className="ofertado"
                data={b}
                user={user}
                update={fetchData}
                type="recibida"
              />
            );
          }
        })}
    </div>
  );
}

export default TransactionBuy;
