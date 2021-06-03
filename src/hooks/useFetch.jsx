import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

function useFetch(url, user) {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const opts ={}
    if (user && user.token){
      opts.headers = { 'Authorization': 'Bearer ' + user.token}
    }
    fetch(url, opts)
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, [url, user]);

  return [results, setResults];
}

export default useFetch;
