import { useState } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import NewSaleImageSelect from "./NewSaleImageSelect"
import NewSaleInfo from "./NewSaleInfo"

const NewSale = () => {

    const [files, setFiles] = useState([])

    const [imageAdded, setImageAdded] = useState(false)
    const isLoggedIn = useSelector(s => !!s.user)
    
    if (!isLoggedIn) return <Redirect to="/" />

    const handleOnChangeAdress = (e) => {

        setTimeout(async() => {
            const res = await fetch(`http://localhost:8080/sell/autocomplete/:input`)
            const data = await res.json()
            
            
        }, 1000);

    }
    return (
        <div className="new-sale">
            <NewSaleImageSelect setImageAdded={setImageAdded} setFiles={setFiles} files={files}/>
            
            {imageAdded && <NewSaleInfo files={files}  />}


        </div>
    )
}


export default NewSale
    


   
    
   

   
