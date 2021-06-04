import { useState } from "react";
import { useSelector } from "react-redux";

function CreateReview({data}) {

  const user = useSelector(s => s.user)

  const [reviewData, setReviewData] = useState({
    review_rating: '',
    review_text: '',
  })

  const updateField = (e, setData, data) => {
    console.log(e)
    if(e.target.type === 'number'){
      setData({
        ...data,
        [e.target.name]: Number(e.target.value),
      })
    }else{
      setData({
        ...data,
        [e.target.name]: e.target.value,
      })
    }
  };

  const handleReview = async e => {
    e.preventDefault()
    const res = await fetch(`http://localhost:8080/catalogue/${data.product_id}/review/update`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer ' + user.token,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(reviewData),
    })
    if(res.ok){
      const data = await res.json();
      console.log(data)
    }
  }

  return <div className="review-edit-bg">
    <form onSubmit={handleReview} className="review-edit-fg" >
      <h2>Editar Review</h2>
      <label htmlFor="review-rting">Puntuacion:</label>
      <input 
        type="number" 
        id="review-rating" 
        name="review_rating" 
        defaultValue ={reviewData.rating}
        min="1" max="5"
        onChange={e => updateField(e, setReviewData, reviewData)}
        />
      <label htmlFor="review-text">Comentario:</label>
      <textarea 
        ows="10"
          cols="50"
          id="review-text" 
          name="review_text"
          type="textarea"
          defaultValue={reviewData.text}
          onChange={e => updateField(e, setReviewData, reviewData)}
      />
      <button>Send</button>
    </form>
  </div>
}

export default CreateReview