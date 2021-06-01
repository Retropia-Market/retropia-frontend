import { useState } from "react"
import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import NewSaleImageSelect from "./NewSaleImageSelect"
import NewSaleInfo from "./NewSaleInfo"
import Location from '../../Location'
import { FormattedMessage } from "react-intl"
import SelectSearch from "react-select-search"

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
            <NewSaleImageSelect setImageAdded={setImageAdded} setFiles={setFiles} files={files}/>
            <label >
                        <FormattedMessage id='sale.productType'/>
                        <br />
                       <SelectSearch options={[{value: 'consola', name: 'Consola'} ,{value: 'videogame', name: 'Videojuego'}, {value: 'accesory', name: 'Accesorio'}]} search
        placeholder="Nombre" onChange={setProductType} />
                    </label>
                    </div>
            
            {imageAdded && <NewSaleInfo files={files} setProductLocation={setProductLocation} productLocation={productLocation} productType={productType}/>}
            </div>
           {productLocation && <Location place={productLocation}/>}


        </div>
    )
}


export default NewSale
    


   
    
   

   
