import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"

const GiveFavComponent = ({ data}) => {

    const user = useSelector(s => s.user)

  const apiFavURL = `http://localhost:8080/${user.userData.id}/getFavourites/`

  const [favorites] = useFetch(apiFavURL, user)
  const [fav, setFav] = useState(false)

  
  useEffect(() => {
      if(favorites){
          const getFav = favorites.map(prod => prod.id)
          getFav.forEach(id => {
              if(id === data.id) setFav(true)
            })
        }
        
        
    },[favorites, data.id])

    const handleFav = async() => {
        if(!fav){
            const ret = await fetch(`http://localhost:8080/${data.id}/addFavourite/${user.userData.id}`, {
                  method: 'POST',
                  headers : {
                      'Authorization' : 'Bearer ' + user.token,
                  },
                })
             if(ret.ok){
            setFav(true)  
        }}
        else {
            const ret = await fetch(`http://localhost:8080/${data.id}/removeFavourite/${user.userData.id}`, {
                  method: 'DELETE',
                  headers : {
                      'Authorization' : 'Bearer ' + user.token,
                  },
                })
             if(ret.ok){
                 console.log(ret)
            setFav(false) 
        
     }
     
   
        }}
    return (
            <div className="heart-icon" onClick={handleFav}>
                {fav ? 'Fav' : 'NoFav'}
            </div>
    )
}

export default GiveFavComponent