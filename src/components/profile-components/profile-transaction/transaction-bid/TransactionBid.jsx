import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, Switch, Route } from 'react-router-dom';
import BidsMade from './BidsMade';
import BidsReceived from './BidsReceived';

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
              <h2>Ofertas Realizadas</h2>
            </li>
          </NavLink>
          <NavLink to="/profile/transactions/bids/received">
            <li className="transactions-navbar-item">
              <h2>Ofertas Recibidas</h2>
            </li>
          </NavLink>
        </ul>
        <Switch>
          <Route path="/profile/transactions/bids" exact>
            <BidsMade />
          </Route>
          <Route path="/profile/transactions/bids/received" exact>
            <BidsReceived />
          </Route>
          <Route path="/profile/transactions/bids/active">Not Found</Route>
        </Switch>
      </div>
    </>
  );
}

export default TransactionBid;
