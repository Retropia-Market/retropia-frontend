import { NavLink, Redirect, Switch, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useState } from 'react';

function ProfileTransaction() {
  const [finishedSales, setFinishedSales] = useState('activas');
  const [finishedBids, setFinishedBids] = useState(false);
  const user = useSelector((s) => s.user);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="transactions-main">
      <ul className="transactions-navbar">
        <NavLink to="/profile/transactions">
          <li className="transactions-navbar-item">
            <h2>Ventas</h2>
          </li>
        </NavLink>
        <NavLink to="/profile/transactions/bids">
          <li className="transactions-navbar-item">
            <h2>Compras</h2>
          </li>
        </NavLink>
      </ul>
      <div className="transactions-section">
        <Switch>
          <Route path="/profile/transactions" exact>
            <h1>Ventas</h1>
            {/* <TransactionSell /> */}
          </Route>
          <Route path="/profile/transactions/bids" exact>
            <h1>Compras & ofertas</h1>
            {/* <TransactionBid /> */}
          </Route>
          <Route path="/profile/transactions">Not Found</Route>
        </Switch>
      </div>
    </div>
  );
}

export default ProfileTransaction;
