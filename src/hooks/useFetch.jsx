
import {useState, useEffect} from 'react'

function useFetch(url){
  const [results, setResults] = useState(null)

  useEffect(() => {
      fetch(url).then(res => res.json())
      .then(data => setResults(data))
  }, [url])

  return [results, setResults]
}

export default useFetch