import React, { useEffect, useState, useCallback } from 'react';
import ProductCard from '../../../ProductCard';
import useFetch from '../../../../hooks/useFetch';
import { FormattedMessage, FormattedNumber } from 'react-intl';

function BidCard({
    data,
    user,
    update,
    type,
    className,
    showReviewModal,
    setShowReviewModal,
}) {
    const [product, setProduct] = useState({});
    const [bidder, setBidder] = useState({});

    const fetchProduct = useCallback(
        async (product_id) => {
            const res = await fetch(
                `http://localhost:8080/catalogue/${product_id}`,
                {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            if (res.ok) {
                const dataRes = await res.json();
                setProduct(dataRes);
            }
        },
        [user]
    );

    const fetchUser = useCallback(
        async (user_id) => {
            const res = await fetch(`http://localhost:8080/users/${user_id}`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + user.token,
                    'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                const dataRes = await res.json();
                setBidder(dataRes);
            }
        },
        [user]
    );

    useEffect(() => {
        fetchProduct(data.product_id);
        fetchUser(data.user_id);
        return () => {};
    }, [data]);

    const handleDelete = async () => {
        const res = await fetch(
            `http://localhost:8080/products/bid/${data.id}/delete`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + user.token,
                    'Content-Type': 'application/json',
                },
            }
        );
        if (res.ok) {
            const data = await res.json();
            update();
            console.log(data);
        } else {
            const data = await res.json();
            console.log(data);
        }
    };

    const handleAccept = async () => {
        console.log(data.id);
        const res = await fetch(
            `http://localhost:8080/products/bid/${data.id}/accept`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: 'Bearer ' + user.token,
                    'Content-Type': 'application/json',
                },
            }
        );
        if (res.ok) {
            const data = await res.json();
            update();
            console.log(data);
        } else {
            const data = await res.json();
            console.log(data);
        }
    };

    const handleReview = async () => {
        setShowReviewModal(true);
    };

    return (
        <div className={`bid ${className}`}>
            {product.id && <ProductCard data={product} />}
            <div className={`bid-card`}>
                <h2>DEV_Estado:</h2>
                <h3>{className}</h3>
                <h2>
                    <FormattedMessage id="profile.bids.message" />
                </h2>
                <h3>{data.bid_message}</h3>
                <h2>
                    {' '}
                    <FormattedMessage id="profile.bids.offer" />:
                </h2>
                <h3>
                    <FormattedNumber
                        style="currency"
                        value={data.bid_price}
                        currency="EUR"
                    />
                </h3>
                <div className="buttons">
                    {bidder.id && <h3>{bidder.username}</h3>}
                    {type === 'recibida' && (
                        <button onClick={handleAccept}>
                            {' '}
                            <FormattedMessage id="profile.bids.acceptoffer" />
                        </button>
                    )}
                    {type === 'realizada' && (
                        <button onClick={handleDelete}>X</button>
                    )}
                    {type === 'completada' && (
                        <button onClick={handleReview}>
                            {' '}
                            <FormattedMessage id="profile.bids.review" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BidCard;
