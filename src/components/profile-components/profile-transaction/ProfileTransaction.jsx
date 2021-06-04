import { NavLink, Redirect, Switch, Route } from 'react-router-dom';
import TransactionSell from './transaction-sell/TransactionSell';
import TransactionBid from './transaction-bid/TransactionBid';
import { useSelector } from 'react-redux';

function ProfileTransaction() {
  const user = useSelector((s) => s.user);

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="transactions-main">
      <ul className="transactions-navbar">
        <NavLink to="/profile/transactions/sell">
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
          <Route path="/profile/transactions/sell">
            <TransactionSell />
          </Route>

          <Route path="/profile/transactions/bids">
            <TransactionBid />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default ProfileTransaction;
