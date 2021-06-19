import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useNotifications from '../../hooks/useNotifications';
import { Link } from 'react-router-dom';

const ReviewsAndBidsNotifications = () => {
    const [hide, setHide] = useState(false);

    const notifications = useSelector((s) => s.notifications);

    const results_bids = useNotifications('noti/bids');
    const results_reviews = useNotifications('noti/reviews');
    const results_sales = useNotifications('noti/sales');

    return (
        <div className="notifications-container">
            <div className="notifications">
                <div className="icon-bubble" onClick={() => setHide(!hide)}>
                    {results_bids &&
                        results_reviews &&
                        results_sales &&
                        (results_bids.length !== 0 ||
                            results_reviews.length !== 0 ||
                            results_sales !== 0) &&
                        (notifications.bids !== 0 ||
                            notifications.reviews !== 0 ||
                            notifications.sales !== 0) && (
                            <div className="bubble">
                                <div>
                                    <span>
                                        {Number(notifications.bids) +
                                            Number(notifications.reviews) +
                                            Number(notifications.sales)}
                                    </span>
                                </div>
                            </div>
                        )}
                    <div className="icon">
                        <FontAwesomeIcon
                            className="notifications"
                            icon={faBell}
                        >
                            ICON
                        </FontAwesomeIcon>
                    </div>
                </div>
            </div>
            {hide &&
                (notifications.bids !== 0 ||
                    notifications.reviews ||
                    notifications.sales) && (
                    <div className="pop-up">
                        {notifications.bids !== 0 && (
                            <Link to="/profile/transactions/bids/received">
                                <span>
                                    {' '}
                                    Tienes {notifications.bids} ofertas nuevas.
                                </span>
                            </Link>
                        )}
                        {notifications.reviews !== 0 && (
                            <Link to="/profile/ratings">
                                <span>
                                    {' '}
                                    Tienes {notifications.reviews} reviews
                                    nuevas.
                                </span>
                            </Link>
                        )}
                        {notifications.sales !== 0 && (
                            <Link to="/profile/transactions/buy">
                                <span>
                                    {' '}
                                    Has comprado {notifications.sales}{' '}
                                    productos!
                                </span>
                            </Link>
                        )}
                    </div>
                )}
        </div>
    );
};

export default ReviewsAndBidsNotifications;
