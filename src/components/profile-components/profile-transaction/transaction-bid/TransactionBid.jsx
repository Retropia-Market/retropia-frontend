import React from 'react';
import { FormattedMessage } from 'react-intl';
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
                    <NavLink
                        to="/profile/transactions/bids/made"
                        className="transactions-navbar-item"
                        activeClassName="selected"
                    >
                        <li>
                            <h2>
                                <FormattedMessage id="profile.bids.done.title" />
                            </h2>
                        </li>
                    </NavLink>
                    <NavLink
                        to="/profile/transactions/bids/received"
                        className="transactions-navbar-item"
                        activeClassName="selected"
                    >
                        <li>
                            <h2>
                                <FormattedMessage id="profile.bids.received.title" />
                            </h2>
                        </li>
                    </NavLink>
                </ul>
                <Switch>
                    <Route path="/profile/transactions/bids/made" exact>
                        <BidsMade />
                    </Route>
                    <Route path="/profile/transactions/bids/received" exact>
                        <BidsReceived />
                    </Route>
                    <Route path="/profile/transactions/bids/active">
                        <FormattedMessage id="profile.notfound" />
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default TransactionBid;
