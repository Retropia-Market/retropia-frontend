import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useNotifications from '../../hooks/useNotifications';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';

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
            {hide && (
                <motion.div
                    className="pop-up"
                    initial={{ height: 0, x: 0 }}
                    animate={{
                        height: 70,
                        x: -50,
                        y: 5,
                        transition: {
                            duration: 0.2,
                        },
                    }}
                >
                    {notifications.bids !== 0 && (
                        <Link
                            to="/profile/transactions/bids/received"
                            onClick={() => setHide(!hide)}
                        >
                            <span>
                                <FormattedMessage
                                    id="notifications.bids"
                                    values={{
                                        notifications: notifications.bids,
                                    }}
                                />
                            </span>
                        </Link>
                    )}
                    {notifications.reviews !== 0 && (
                        <Link
                            to="/profile/ratings"
                            onClick={() => setHide(!hide)}
                        >
                            <span>
                                <FormattedMessage
                                    id="notifications.reviews"
                                    values={{
                                        notifications: notifications.reviews,
                                    }}
                                />
                            </span>
                        </Link>
                    )}
                    {notifications.sales !== 0 && (
                        <Link
                            to="/profile/transactions/buy"
                            onClick={() => setHide(!hide)}
                        >
                            <span>
                                <FormattedMessage
                                    id="notifications.sales"
                                    values={{
                                        notifications: notifications.sales,
                                    }}
                                />
                            </span>
                        </Link>
                    )}
                    {notifications.sales === 0 &&
                        notifications.reviews === 0 &&
                        notifications.bids === 0 && (
                            <span onClick={() => setHide(!hide)}>
                                <FormattedMessage id="notifications.nothing" />
                            </span>
                        )}
                </motion.div>
            )}
        </div>
    );
};

export default ReviewsAndBidsNotifications;
