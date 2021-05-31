import { useState } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import NewSaleImageSelect from "./NewSaleImageSelect"
import NewSaleInfo from "./NewSaleInfo"
import Location from '../../Location'

const NewSale = () => {

    const [files, setFiles] = useState([])
    const [productLocation, setProductLocation] = useState()

    const [imageAdded, setImageAdded] = useState(false)
    const isLoggedIn = useSelector(s => !!s.user)
    
    if (!isLoggedIn) return <Redirect to="/" />
    return (
        <div className="new-sale">
            <div className="new-sale-main">
            <NewSaleImageSelect setImageAdded={setImageAdded} setFiles={setFiles} files={files}/>
            
            {imageAdded && <NewSaleInfo files={files} setProductLocation={setProductLocation} productLocation={productLocation} />}
            </div>
           {productLocation && <Location place={productLocation}/>}


        </div>
    )
}


export default NewSale
    


   
    
   

   
