import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useNotifications(actionType) {
    const [data, setData] = useState(null);
    const user = useSelector((s) => s.user);
    const dispatch = useDispatch();
    const url =
        actionType === 'noti/messages'
            ? 'http://localhost:8080/api/notifications/messages'
            : actionType === 'noti/bids'
            ? 'http://localhost:8080/api/notifications/bids'
            : actionType === 'noti/reviews'
            ? 'http://localhost:8080/api/notifications/reviews'
            : null;

    useEffect(() => {
        const opts = {};
        if (user && user.token) {
            opts.headers = { Authorization: 'Bearer ' + user.token };
        }
        fetch(url, opts)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                if (data?.length !== 0) {
                    let dispatchObject = { type: actionType };
                    dispatchObject[actionType] = data.length;
                    dispatch(dispatchObject);
                }
            });
    }, [url, user, actionType, dispatch]);

    return data;
}

export default useNotifications;