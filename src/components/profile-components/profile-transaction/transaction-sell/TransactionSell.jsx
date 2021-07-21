import React, { useState, useEffect, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import SellCard from './SellCard';

function TransactionSell() {
  const user = useSelector((s) => s.user);
  const [sellsObject, setSellssObject] = useState({});

  const fetchData = useCallback(async () => {
    const res = await fetch(
      `http://15.188.133.89:8080/users/${user.userData.id}/catalogue`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    if (res.ok) {
      const data = await res.json();
      setSellssObject({ productsOnSale: data });
    }
  }, [user]);

  useEffect(() => {
    fetchData();
    return () => {};
  }, [fetchData]);

  console.log('Hola');
  console.log(sellsObject);

  return (
    <div className="bids-active">
      {!Object.keys(sellsObject).length && <h3>Cargando...</h3>}

      {sellsObject.productsOnSale?.length === 0 && (
        <h3>
          <FormattedMessage id="profile.transactions.notsales" />
        </h3>
      )}
      {sellsObject &&
        sellsObject.productsOnSale?.map((b) => (
          <SellCard data={b} user={user} update={fetchData} />
        ))}
    </div>
  );
}

export default TransactionSell;
