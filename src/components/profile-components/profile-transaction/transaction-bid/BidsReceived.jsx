import React, { useState, useEffect, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import BidCard from './BidCard';

function BidsReceived() {
    const user = useSelector((s) => s.user);
    const [bidsObject, setBidsObject] = useState({});
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        const res = await fetch(
            `http://localhost:8080/products/bid/user/${user.userData.id}/received/`,
            {
                method: 'GET',
                headers: { Authorization: `Bearer ${user.token}` },
            }
        );
        if (res.ok) {
            const data = await res.json();
            setBidsObject(data);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
        dispatch({ type: 'noti/bids', 'noti/bids': 0 });
        return () => {};
    }, [fetchData, dispatch]);

    return (
        <div className="bids-active">
            {!Object.keys(bidsObject).length && <h3>Cargando...</h3>}

            {bidsObject.bids?.length === 0 && (
                <h3>
                    <FormattedMessage id="profile.bids.notyet" />
                </h3>
            )}
            {bidsObject &&
                bidsObject.bids?.map((b) => {
                    if (
                        b.bid_status === 'aceptado' ||
                        b.bid_status === 'rechazado'
                    ) {
                        return null;
                    } else {
                        return (
                            <BidCard
                                className="ofertado"
                                data={b}
                                user={user}
                                update={fetchData}
                                type="recibida"
                                key={b.id}
                            />
                        );
                    }
                })}
        </div>
    );
}

export default BidsReceived;
