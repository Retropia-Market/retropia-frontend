import { useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import ProductCard from '../../ProductCard';
import ReactStarsRating from 'react-awesome-stars-rating';
import { Link } from 'react-router-dom';

function MadeReviews() {
  const user = useSelector((s) => s.user);
  const [reviews] = useFetch(
    `http://15.188.133.89:8080/users/${user.userData.id}/review/reviews-made`,
    user
  );
  const madeReviews = reviews?.madeReviews;

  if (!madeReviews) {
    return <div>cargando...</div>;
  }

  return madeReviews
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

            <span className="">
              {' '}
              <Link to={`/users/${r.user_id}`}>{user.userData.id}</Link>
            </span>
          </footer>
        </div>
      </div>
    ));
}

export default MadeReviews;
