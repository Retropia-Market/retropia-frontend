import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import ProductCard from '../../ProductCard';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Link } from 'react-router-dom';

function ReceivedReviews() {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const [reviews] = useFetch(
    `https://api.retropia-market.com/users/${user.userData.id}/review/reviews-received`,
    user
  );
  let receivedReviews = reviews?.receivedReviews;
  dispatch({ type: 'noti/reviews', 'noti/reviews': 0 });
  if (!receivedReviews) {
    return <div>cargando...</div>;
  }

  return receivedReviews
    .slice()
    .reverse()
    .map((r) => (
      <div key={r.id} className="reviews">
        <ProductCard data={r} />
        <div className="info">
          <header>
            <div className="title">{r.name}</div>
            <p className="rating">
              <ReactStarsRating
                className="react-stars"
                value={+r?.review_rating > 0 ? +r?.review_rating : 0}
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

            <span className="username">
              <Link to={`/users/${r.user_id}`}>{r.reviewer_name} </Link>
            </span>
          </footer>
        </div>
      </div>
    ));
}

export default ReceivedReviews;
