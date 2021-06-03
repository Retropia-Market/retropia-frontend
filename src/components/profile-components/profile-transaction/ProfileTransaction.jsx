import { NavLink, Redirect, Switch, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useState } from 'react';

function ProfileTransaction() {
  const [finishedSales, setFinishedSales] = useState(false);
  const [finishedBids, setFinishedBids] = useState(false);
  const user = useSelector((s) => s.user);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="transactions-main">
      <ul className="transactions-navbar">
        <li className="transactions-navbar-item">
          <NavLink to="/profile/transactions">
            <h2>Ventas</h2>
          </NavLink>
        </li>
        <li className="transactions-navbar-item">
          <NavLink to="/profile/transactions/bids">
            <h2>Compras</h2>
          </NavLink>
        </li>
      </ul>
      <div className="transactions-section">
        <Switch>
          <Route path="/profile/transactions" exact>
            <h1>Ventas</h1>
            <div className="sub-sections-nav">
              <h3 onClick="">Activas</h3>
              <h3>Finalizadas</h3>
            </div>
          </Route>
          <Route path="/profile/transactions/bids" exact>
            <h1>Compras & ofertas</h1>
          </Route>
          <Route path="/profile/transactions">Not Found</Route>
        </Switch>
      </div>
    </div>
  );
}

export default ProfileTransaction;
