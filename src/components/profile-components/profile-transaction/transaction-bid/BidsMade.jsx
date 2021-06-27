import React, { useState, useEffect, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import BidCard from './BidCard';

function BidsMade() {
    const user = useSelector((s) => s.user);
    const [bidsObject, setBidsObject] = useState({});

    const fetchData = useCallback(async () => {
        const res = await fetch(
            `http://localhost:8080/products/bid/user/${user.userData.id}/made`,
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
        return () => {};
    }, [fetchData]);

    return (
        <div className="outside-box">
        <div className="bids-active">
            {!Object.keys(bidsObject).length && <h3>Cargando...</h3>}

            {bidsObject.bids?.length === 0 && (
                <h3 className='transaction-empty'>
                    <FormattedMessage id="profile.bids.notdoneyet" />
                </h3>
            )}
            {bidsObject &&
                bidsObject.bids?.map((b) => (
                    <BidCard
                        data={b}
                        user={user}
                        update={fetchData}
                        type="realizada"
                    />
                ))}
        
        </div>
        </div>
    );
}

export default BidsMade;
