import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const NewBid = ({ showBidModal, setShowBidModal }) => {
  const productId = 1;
  const [bidData, setBidData] = useState({
    message: '',
    bidPrice: 0,
  });

  const user = useSelector((s) => s.user);
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8080/products/${productId}/bid`, {
      method: 'POST',
      body: JSON.stringify(bidData),
      headers: {
        Authorization: 'Bearer ' + user.token,
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setShowBidModal(false);
    } else {
      alert('parece que algo salio mal');
      const data = await res.json();
      console.log(data);
    }
  };

  const updateField = (e) => {
    setBidData({
      ...bidData,
      [e.target.name]: e.target.value,
    });
  };

  const closeModalHandler = (e) => {
    setShowBidModal(false);
  };

  return (
    <div className="bid-bg" onClick={closeModalHandler}>
      <form
        className="bid-fg"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="bid-title">
          <FormattedMessage id="bid.new" />
        </h2>
        <div className="bid-inputs">
          <div className="container message">
            <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>
            <label htmlFor="message-bid">
              <FormattedMessage id="bid.message" />
              <div className="bid-message-field">
                <textarea
                  id="message-bid"
                  type="textarea"
                  value={bidData.bidMessage}
                  name="bidMessage"
                  onChange={updateField}
                />
              </div>
            </label>
          </div>
          <div className="container price">
            <FontAwesomeIcon icon={faEuroSign}></FontAwesomeIcon>
            <label htmlFor="price-bid">
              <FormattedMessage id="bid.price" />
              <div className="bid-price-field">
                <input
                  id="price-bid"
                  type="number"
                  min="0"
                  value={bidData.bidPrice}
                  name="bidPrice"
                  onChange={updateField}
                />
              </div>
            </label>
          </div>
        </div>
        <button>Hacer Oferta</button>
      </form>
    </div>
  );
};

export default NewBid;
