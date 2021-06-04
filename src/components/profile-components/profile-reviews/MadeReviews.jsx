import { useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import ReviewProductCard from "./ReviewProductCard";


function MadeReviews() {
  const user = useSelector(s => s.user)
  const [reviews] = useFetch(`http://localhost:8080/users/${user.userData.id}/review/reviews-made`, user)
  const madeReviews = reviews?.madeReviews

  if(!madeReviews){
    return <div>cargando...</div>
  }

  console.log(madeReviews)

  return madeReviews.map(r => <div key={r.id} className="reviews">
        <ReviewProductCard data={r} />
        <div className="info">
          <header>
            <h3 className="title">{r.product_id}</h3>
            <p className="rating">{r.review_rating}</p>
          </header>
          <p className="text">{r.review_text}</p>
          <footer>
            <span className="date">{r.review_date}</span>
            <span className="">{user.userData.username}</span>
          </footer>
        </div>
      </div> )
}

export default MadeReviews