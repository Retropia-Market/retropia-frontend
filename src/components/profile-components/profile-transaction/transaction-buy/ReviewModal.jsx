import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import ReactStarsRating from 'react-awesome-stars-rating';

function ReviewModal({ setShowReviewModal, data }) {
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = await fetch(
      `http://localhost:8080/catalogue/${data.id}/review/create`,
      {
        method: 'POST',
        body: JSON.stringify({
          review_rating: reviewRating,
          review_text: reviewText,
        }),
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      dispatch({ type: 'modal', user: data });
    } else if (res.status === 401) {
      setErrorMessage('Usuario o Contraseña incorrectos.');
      console.log(errorMessage);
    } else {
      console.log('Parece que algo fue mal');
    }
  };

  return (
    <div
      className="modal-bg"
      onClick={(e) => {
        setShowReviewModal(false);
      }}
    >
      <form
        className="modal-fg"
        id="review-fg"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title">
          <FormattedMessage id="review.modal.title" />
        </h2>
        <div className="modal-inputs">
          <label htmlFor="username-modal">
            <FormattedMessage id="review.note" />
          </label>
          <ReactStarsRating
            isHalf="true"
            isEdit="true"
            value={reviewRating}
            onChange={setReviewRating}
          />
          {console.log(reviewRating)}

          <label htmlFor="review-text">
            <FormattedMessage id="review.text" />
          </label>
          <div className="modal-field">
            <input
              id="review-text"
              type="textarea"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            {console.log(data)}
          </div>
        </div>

        <button className="modal-button">
          <FormattedMessage id="review.modal.send" onClick={handleSubmit} />
        </button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>

      <FontAwesomeIcon
        className="modal-exit"
        icon={faChevronUp}
        size="2x"
      ></FontAwesomeIcon>
    </div>
  );
}

export default ReviewModal;
