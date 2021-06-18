import useFetch from '../../hooks/useFetch';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const ReviewsAndBidsNotifications = () => {
    const user = useSelector((s) => s.user);
    const [hide, setHide] = useState(false);
    const bidsURL = 'http://localhost:8080/api/notifications/bids';
    const reviewsURL = 'http://localhost:8080/api/notifications/reviews';

    const [results_bids] = useFetch(bidsURL, user);
    const [results_reviews] = useFetch(reviewsURL, user);

    return (
        <div className="notifications">
            <div className="icon-bubble" onClick={() => setHide(!hide)}>
                <div className="bubble">
                    {results_bids &&
                        results_reviews &&
                        (results_bids.length !== 0 ||
                            results_reviews.length !== 0) && (
                            <div>
                                {results_bids.length + results_reviews.length}
                            </div>
                        )}
                </div>
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
