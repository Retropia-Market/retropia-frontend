import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function TransactionBuy() {
  const user = useSelector((s) => s.user);

  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="transactions-subnav">
        <h1>Compras</h1>
      </div>
    </>
  );
}

export default TransactionBuy;
