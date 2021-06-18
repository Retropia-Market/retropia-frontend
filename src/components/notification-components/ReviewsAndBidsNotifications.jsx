import useFetch from '../../hooks/useFetch';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import useNotifications from '../../hooks/useNotifications';

const ReviewsAndBidsNotifications = () => {
    const [hide, setHide] = useState(false);

    const notifications = useSelector((s) => s.notifications);

    const results_bids = useNotifications('noti/bids');
    const results_reviews = useNotifications('noti/reviews');

    return (
        <div className="notifications">
            <div className="icon-bubble" onClick={() => setHide(!hide)}>
                {results_bids &&
                    results_reviews &&
                    (results_bids.length !== 0 ||
                        results_reviews.length !== 0) &&
                    (notifications.bids !== 0 && notifications.reviews !== 0)(
                        <div className="bubble">
                            <div>
                                {Number(notifications.bids) +
                                    Number(notifications.reviews)}
                            </div>
                        </div>
                    )}
                <div className="icon">
                    <FontAwesomeIcon className="notifications" icon={faBell}>
                        ICON
                    </FontAwesomeIcon>
                </div>
            </div>
            {hide && <div className="pop-up"></div>}
        </div>
    );
};

export default ReviewsAndBidsNotifications;
