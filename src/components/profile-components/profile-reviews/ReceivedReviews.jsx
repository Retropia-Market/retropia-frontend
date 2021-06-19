import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
// import ProductCard from "../../ProductCard";

function ReceivedReviews() {
    const user = useSelector((s) => s.user);
    const dispatch = useDispatch();
    const [reviews] = useFetch(
        `http://localhost:8080/users/${user.userData.id}/review/reviews-received`,
        user
    );
    const receivedReviews = reviews?.receivedReviews;
    dispatch({ type: 'noti/reviews', 'noti/reviews': 0 });

    if (!receivedReviews) {
        return <div>cargando...</div>;
    }

    return receivedReviews.map((r) => (
        <div key={r.id} className="reviews">
            {/* <ProductCard /> */}
            <div className="info">
                <header>
                    <h3 className="title">{r.product_id}</h3>
                    <p className="rating">{r.review_rating}</p>
                </header>
                <p className="text">{r.review_text}</p>
                <footer>
                    <span className="date">{r.review_date}</span>
                    <span className="">{r.user_id}</span>
                </footer>
            </div>
        </div>
    ));
}

export default ReceivedReviews;
