import { useState, useEffect } from 'react';

function useFetch(errorMessage) {
  const [error, setError] = useState('');

  useEffect(() => {}, []);

  return [error, setError];
}

export default useFetch;
