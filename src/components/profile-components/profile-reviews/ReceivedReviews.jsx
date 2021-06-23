import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import ProductCard from '../../ProductCard';
import ReactStarsRating from 'react-awesome-stars-rating';

function ReceivedReviews() {
    const user = useSelector((s) => s.user);
    const dispatch = useDispatch();
    const [reviews] = useFetch(
        `http://localhost:8080/users/${user.userData.id}/review/reviews-received`,
        user
    );
    const receivedReviews = reviews?.receivedReviews;
    dispatch({ type: 'noti/reviews', 'noti/reviews': 0 });
    console.log(receivedReviews);

    if (!receivedReviews) {
        return <div>cargando...</div>;
    }

    return receivedReviews.map((r) => (
        <div key={r.id} className="reviews">
            <ProductCard data={r} />
            <div className="info">
                <header>
                    <h3 className="title">{r.name}</h3>
                    <p className="rating">
                        <ReactStarsRating
                            className="react-stars"
                            value={
                                +r?.review_rating > 0 ? +r?.review_rating : 0
                            }
                            isEdit={false}
                            isHalf={true}
                        />
                    </p>
                </header>
                <p className="text">{r.review_text}</p>
                <footer>
                    <span className="date">
                        {r.review_date.slice(0, r.review_date.indexOf('T'))}
                    </span>
                    <span className="">{r.reviewer_name}</span>
                </footer>
            </div>
        </div>
    ));
}

export default ReceivedReviews;
