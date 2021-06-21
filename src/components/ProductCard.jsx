import { FormattedNumber } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import productPlaceholder from '../img/colorPlaceholder.svg';
import NewBid from '../components/NewBid';
import { useState } from 'react';
import ReactStarsRating from 'react-awesome-stars-rating';
import GiveFavComponent from './GiveFavComponent';
import { useSelector, useDispatch } from 'react-redux';
// Animation
import { motion } from 'framer-motion';
import { item } from './animations';

import messageIcon from '../img/icons/message-grey-icon.svg';
import basketIcon from '../img/icons/basket-grey-icon.svg';
import { useEffect } from 'react';

const ProductCard = ({ data, favorites }) => {
    const [showBidModal, setShowBidModal] = useState(false);
    const history = useHistory();
    const { seller, name, status, price, images, seller_id, id } = data;
    const results = useFetch(`http://localhost:8080/user/${seller_id}/rating`);
    const { userData, token } = useSelector((s) => s.user);
    const [getBids] = useFetch(`http://localhost:8080/products/${id}/bid`);
    const contacts = useSelector((s) => s.contacts);
    const dispatch = useDispatch();
    const [doneBid, setDoneBid] = useState(false);

    useEffect(() => {
        getBids?.bids
            ? setDoneBid(
                  getBids.bids.some(
                      (product) => (product.user_id = userData.id)
                  )
              )
            : setDoneBid(false);
    }, [setDoneBid, getBids, userData.id]);

    const handleBid = () => {
        setShowBidModal(!showBidModal);
    };

    const handleOnClick = (e) => {
        history.replace('/catalogue/' + data.id);
    };

    const chatClickHandler = async (e) => {
        if (!contacts[seller_id]) {
            const res = await fetch(
                `http://localhost:8080/chats/${userData.id}/add-contact/${seller_id}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );
            console.log(res);
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                dispatch({ type: 'ADD-CONTACT', data: data.contact });
            } else {
                // TODO: configurar errores
                console.error('error inesperado');
            }
        }
        history.push(`/profile/chat/${seller_id}`);
    };

    if (!data) return;

    return (
        <>
            <motion.li
                variants={item}
                animate="visible"
                initial="hidden"
                exit="hidden"
                className="product-item"
            >
                <div className="product-card">
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
                            <span className="product-card-info-name">
                                {name}
                            </span>
                            <span className="product-card-info-price">
                                <span className="product-card-info-status">
                                    {status}
                                </span>
                                <FormattedNumber
                                    style="currency"
                                    value={price}
                                    currency="EUR"
                                />
                            </span>
                        </div>
                        <div className="product-card-info-user-icons">
                            <div className="product-card-info-user">
                                <span className="product-card-info-seller">
                                    <Link to={`/users/${seller_id}`}>
                                        {seller}
                                    </Link>
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
                                        <GiveFavComponent
                                            favorites={favorites}
                                            data={data}
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>

                                {userData && userData.id !== seller_id && (
                                    <div>
                                        <div
                                            onClick={chatClickHandler}
                                            className="message-icon"
                                            style={{
                                                background: `url(${messageIcon}) no-repeat`,
                                                cursor: 'pointer',
                                            }}
                                        ></div>
                                    </div>
                                )}
                                {userData &&
                                    userData.id !== seller_id &&
                                    !doneBid && (
                                        <div>
                                            <div
                                                onClick={handleBid}
                                                className="basket-icon"
                                                style={{
                                                    background: `url(${basketIcon}) no-repeat`,
                                                }}
                                            ></div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.li>
            {showBidModal && (
                <NewBid
                    id={id}
                    showBidModal={showBidModal}
                    setShowBidModal={setShowBidModal}
                    setDoneBid={setDoneBid}
                />
            )}
        </>
    );
};

export default ProductCard;
