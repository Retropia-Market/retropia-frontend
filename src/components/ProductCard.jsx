import { FormattedNumber } from "react-intl";
import { Link, useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import productPlaceholder from "../img/colorPlaceholder.svg";
import NewBid from "../components/NewBid";
import { useState } from "react";
import ReactStarsRating from "react-awesome-stars-rating";
import GiveFavComponent from "./GiveFavComponent";
import { useSelector } from "react-redux";
// Animation
import { motion } from "framer-motion";
import { item } from "./animations";

import messageIcon from "../img/icons/message-grey-icon.svg";
import basketIcon from "../img/icons/basket-grey-icon.svg";
import { initial } from "lodash";

const ProductCard = ({ data, favorites }) => {
  const [showBidModal, setShowBidModal] = useState(false);
  const history = useHistory();

  const { seller, name, status, price, images, seller_id, id } = data;
  const results = useFetch(`http://localhost:8080/user/${seller_id}/rating`);
  const { userData } = useSelector((s) => s.user);

  const handleBid = () => {
    setShowBidModal(!showBidModal);
  };

  const handleOnClick = (e) => {
    history.replace("/catalogue/" + data.id);
  };

  if (!data) return;

  return (
    <>
      <motion.div
        variants={item}
        animate="visible"
        initial="hidden"
        exit="hidden"
        className="product-card"
      >
        <div
          className="product-card-img"
          onClick={handleOnClick}
          style={{
            backgroundImage: images[0]?.url
              ? `url(http:/\/\localhost:8080/${data.images[0]?.url})`
              : `url(${productPlaceholder})`,
          }}
        ></div>
        <div className="product-card-info">
          <div className="product-card-info-name-price">
            <span className="product-card-info-name">{name}</span>
            <span className="product-card-info-price">
              <span className="product-card-info-status">{status}</span>
              <FormattedNumber style="currency" value={price} currency="EUR" />
            </span>
          </div>
          <div className="product-card-info-user-icons">
            <div className="product-card-info-user">
              <span className="product-card-info-seller">
                <Link to={`/users/${seller_id}`}>{seller}</Link>
              </span>
              <span className="product-card-info-average-rating">
                <ReactStarsRating
                  className="react-stars"
                  value={
                    +results[0]?.review_average > 0
                      ? +results[0]?.review_average
                      : 0
                  }
                  isEdit={false}
                  isHalf={true}
                />
              </span>
              <span className="product-card-info-total-ratings">
                ({results[0]?.total_review})
              </span>
            </div>
            <div className="product-card-info-icons">
              <div>
                {userData ? (
                  <GiveFavComponent favorites={favorites} data={data} />
                ) : (
                  ""
                )}
              </div>

              <Link
                to="/"
                className="message-icon"
                style={{
                  background: `url(${messageIcon}) no-repeat`,
                }}
              ></Link>
              <div
                onClick={handleBid}
                className="basket-icon"
                style={{
                  background: `url(${basketIcon}) no-repeat`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>
      {showBidModal && (
        <NewBid
          id={id}
          showBidModal={showBidModal}
          setShowBidModal={setShowBidModal}
        />
      )}
    </>
  );
};

export default ProductCard;
