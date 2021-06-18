import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import useFetch from "../../../hooks/useFetch";

export function AccountVerification() {
  const {emailCode} = useParams()
  const url = `http://localhost:8080/verify-email/${emailCode}`
  const dispatch = useDispatch()
  const history = useHistory()

  const user = useFetch(url)

  if(user){
    dispatch({type: 'LOGIN', user})
    setTimeout(() => {
        history.push('/')
      }, 1000);
  }

  return <>
    {!user && 
      <h2>cargando...</h2>
    }
    {user && 
      <h2>Account verified</h2>
    }
  </>
}