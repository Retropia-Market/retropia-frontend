import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faEuroSign } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

const NewBid = ({ id, setDoneBid, setShowBidModal }) => {
  const [bidData, setBidData] = useState({
    message: '',
    bidPrice: 0,
  });

  const user = useSelector((s) => s.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://api.retropia-market.com/products/${id}/bid`,
      {
        method: 'POST',
        body: JSON.stringify(bidData),
        headers: {
          Authorization: 'Bearer ' + user.token,
          'Content-Type': 'application/json',
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      setShowBidModal(false);
      setDoneBid(true);
    } else {
      alert('parece que algo salio mal');
      const data = await res.json();
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
    <div className="bid-bg" onMouseDown={closeModalHandler}>
      <form
        className="bid-fg"
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="bid-title">
          <FormattedMessage id="bid.new" />
        </h2>
        <div className="bid-inputs">
          <div className="container-message">
            <label htmlFor="message-bid">
              <div className="message-to-seller">
                <FormattedMessage id="bid.message" />
              </div>
              <div className="bid-message-field">
                <textarea
                  maxlength="100"
                  autoFocus="true"
                  id="message-bid"
                  type="textarea"
                  value={bidData.bidMessage}
                  name="message"
                  onChange={updateField}
                />
              </div>
            </label>
          </div>
          <div className="container-price">
            <label htmlFor="price-bid">
              <div className="bid-price-field">
                <h3 className="amount-to-offer">
                  <FormattedMessage id="bid.price" />
                </h3>
                <input
                  id="price-bid"
                  type="number"
                  min="0"
                  value={bidData.bidPrice}
                  name="bidPrice"
                  onChange={updateField}
                />
                <FontAwesomeIcon icon={faEuroSign}></FontAwesomeIcon>
              </div>
            </label>
          </div>
        </div>
        <button className="submit-button-1 modal-button">
          <FormattedMessage id="bid.button" />
        </button>
      </form>
    </div>
  );
};

export default NewBid;
