import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import useFetch from '../../../hooks/useFetch';

export function AccountVerification() {
  const { emailCode } = useParams();
  const url = `https://api.retropia-market.com/verify-email/${emailCode}`;
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useFetch(url);

  if (user) {
    dispatch({ type: 'LOGIN', user });
    setTimeout(() => {
      history.push('/');
    }, 1000);
  }

  return (
    <>
      {!user && (
        <h2>
          <FormattedMessage id="loading" />
        </h2>
      )}
      {user && (
        <h2>
          <FormattedMessage id="account.verified" />
        </h2>
      )}
    </>
  );
}
