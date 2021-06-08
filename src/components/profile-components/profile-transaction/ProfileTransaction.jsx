import { NavLink, Redirect, Switch, Route } from 'react-router-dom';
import UserPublicInventory from '../../UserPublicProfile/UserPublicInventory';
import TransactionBid from './transaction-bid/TransactionBid';
import TransactionBuy from './transaction-buy/TransactionBuy';

function ProfileTransaction({user}) {

  if (!user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="transactions-main">
      <ul className="transactions-navbar">
        <NavLink
          to="/profile/transactions/bids"
          className={'transactions-navbar-item'}
          activeClassName="selected"
        >
          <li>
            <h2>Ofertas</h2>
          </li>
        </NavLink>

        <NavLink
          to={`/profile/transactions/sell/user/${user.userData.id}`}
          className={'transactions-navbar-item'}
          activeClassName="selected"
        >
          <li>
            <h2>Ventas</h2>
          </li>
        </NavLink>

        <NavLink
          to="/profile/transactions/buy"
          className={'transactions-navbar-item'}
          activeClassName="selected"
        >
          <li>
            <h2>Compras</h2>
          </li>
        </NavLink>
      </ul>
      <div className="transactions-section">
        <Switch>
          <Route path="/profile/transactions/bids">
            <TransactionBid />
          </Route>

          <Route path={`/profile/transactions/sell/user/${user.userData.id}`}>
            <UserPublicInventory uid={user.userData.id} />
          </Route>

          <Route path="/profile/transactions/buy">
            <TransactionBuy />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default ProfileTransaction;
