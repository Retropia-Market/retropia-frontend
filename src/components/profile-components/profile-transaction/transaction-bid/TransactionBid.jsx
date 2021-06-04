import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, Switch, Route } from 'react-router-dom';
import BidActive from './BidActive';

function TransactionBid() {
  const user = useSelector((s) => s.user);

  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="transactions-subnav">
        <ul className="transactions-bids-navbar">
          <NavLink to="/profile/transactions/bids">
            <li className="transactions-navbar-item">
              <h2>Ofertas Activas</h2>
            </li>
          </NavLink>
          <NavLink to="/profile/transactions/bids/finished">
            <li className="transactions-navbar-item">
              <h2>Compras Finalizadas</h2>
            </li>
          </NavLink>
        </ul>
        <Switch>
          <Route path="/profile/transactions/bids" exact>
            <BidActive />
          </Route>
          <Route path="/profile/transactions/bids/finished" exact>
            <h1>Compras Finalizadas</h1>
          </Route>
          <Route path="/profile/transactions/bids/active">Not Found</Route>
        </Switch>
      </div>
    </>
  );
}

export default TransactionBid;
