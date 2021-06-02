import { useState, useEffect } from 'react';

function useFetch(errorMessage) {
  const [error, setError] = useState('');

  useEffect(() => {
    switch (errorMessage) {
      case 'value':
        break;

      default:
        return 'Ha ocurrido un error';
        break;
    }
  }, []);

  return [error, setError];
}

export default useFetch;
