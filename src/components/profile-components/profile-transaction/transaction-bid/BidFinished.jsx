import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import { NavLink, Redirect, Switch, Route } from 'react-router-dom';

function BidFinished() {
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
                            <h2>
                                <FormattedMessage id="profile.bids.active" />
                            </h2>
                        </li>
                    </NavLink>
                    <NavLink to="/profile/transactions/bids/finished">
                        <li className="transactions-navbar-item">
                            <h2>
                                <FormattedMessage id="profile.purchases.finished" />
                            </h2>
                        </li>
                    </NavLink>
                </ul>
                <Switch>
                    <Route path="/profile/transactions/bids" exact>
                        <h1>
                            <FormattedMessage id="profile.bids.active" />
                        </h1>
                    </Route>
                    <Route path="/profile/transactions/bids/finished" exact>
                        <h1>
                            <FormattedMessage id="profile.purchases.finished" />
                        </h1>
                    </Route>
                    <Route path="/profile/transactions/bids/active">
                        Not Found
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default BidFinished;
