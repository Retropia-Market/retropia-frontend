import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function useFetch(url, actionType) {
  const [data, setData] = useState(null)
  const user = useSelector(s => s.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const opts = {}
    if (user && user.token) {
      opts.headers = { 'Authorization': 'Bearer ' + user.token }
    }
    fetch(url, opts)
      .then(res => res.json())
      .then(data => {
        setData(data)
        if (actionType) dispatch({ type: actionType, data })
      })
  }, [url, user, actionType, dispatch])

  return data
}

export default useFetch