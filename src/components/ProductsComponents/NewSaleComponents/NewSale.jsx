import { useState } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import NewSaleImageSelect from "./NewSaleImageSelect"
import NewSaleInfo from "./NewSaleInfo"
import Location from '../../Location'

const NewSale = () => {

    const [files, setFiles] = useState([])
    const [productLocation, setProductLocation] = useState()
    const [productType, setProductType] = useState()

    const [imageAdded, setImageAdded] = useState(false)
    const isLoggedIn = useSelector(s => !!s.user)
    
    if (!isLoggedIn) return <Redirect to="/" />
    return (
        <div className="new-sale">
            <div className="new-sale-main">
                <div className="new-sale-first-step">
            <NewSaleImageSelect setImageAdded={setImageAdded} setFiles={setFiles} files={files} setProductType={setProductType}/>
                 </div>
            
            {imageAdded && <NewSaleInfo files={files} setProductLocation={setProductLocation} productLocation={productLocation} productType={productType} setProductType={setProductType}/>}
            </div>
           {productLocation && <Location place={productLocation}/>}


        </div>
    )
}


export default NewSale
    


   
    
   

   
