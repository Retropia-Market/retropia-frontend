import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import BidCard from './BidCard';

function BidsReceived() {
  const user = useSelector((s) => s.user);
  const [bidsObject, setBidsObject] = useState({});

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `http://localhost:8080/products/bid/user/${user.userData.id}`,
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
        bidsObject.bids?.map((b) => (
          <BidCard data={b} user={user} update={fetchData} />
        ))}
    </div>
  );
}

export default BidsReceived;
