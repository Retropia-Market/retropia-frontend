import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, Switch, Route } from 'react-router-dom';

function TransactionSell() {
  const user = useSelector((s) => s.user);

  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="transactions-subnav">
        <ul className="transactions-sell-navbar">
          <NavLink to="/profile/transactions/sell">
            <li className="transactions-navbar-item">
              <h2>Ventas Activas</h2>
            </li>
          </NavLink>
          <NavLink to="/profile/transactions/sell/finished">
            <li className="transactions-navbar-item">
              <h2>Ventas Finalizadas</h2>
            </li>
          </NavLink>
        </ul>
        <Switch>
          <Route path="/profile/transactions/sell" exact>
            <h1>Ventas Activas</h1>
          </Route>
          <Route path="/profile/transactions/sell/finished" exact>
            <h1>Ventas Finalizadas</h1>
          </Route>
          <Route path="/profile/transactions/sell">Not Found</Route>
        </Switch>
      </div>
    </>
  );
}

export default TransactionSell;
