import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function useNotifications(actionType) {
  const [data, setData] = useState(null);
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const url =
    actionType === 'noti/messages'
      ? 'https://api.retropia-market.com/api/notifications/messages'
      : actionType === 'noti/bids'
      ? 'https://api.retropia-market.com/api/notifications/bids'
      : actionType === 'noti/reviews'
      ? 'https://api.retropia-market.com/api/notifications/reviews'
      : actionType === 'noti/sales'
      ? 'https://api.retropia-market.com/api/notifications/sales'
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
          const dispatchObject = { type: actionType };
          dispatchObject[actionType] = data.length;
          dispatch(dispatchObject);
        }
      });
  }, [url, user, actionType, dispatch]);

  return data;
}

export default useNotifications;
