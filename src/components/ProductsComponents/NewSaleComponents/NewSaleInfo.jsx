import { useState } from "react"
import { FormattedMessage } from "react-intl"
import { useSelector } from "react-redux"
import SelectSearch from "react-select-search"
import CatSelector from "./CatSelector"
import LocationSelector from "./LocationSelector"
import NameVideoGameSelector from "./NameVideoGameSelector"

const NewSaleInfo = ({files, setProductLocation, productLocation ,productType, setProductType}) => {

     
    const [productName, setProductName] = useState()
    const [productStatus, setProductStatus] = useState()
    const [productPrice, setProductPrice] = useState()
    const [productDescription, setProductDescription] = useState()
    
    const [productCategory, setProductCategory] = useState([])
    

    const user = useSelector(s => s.user)


    const handleSubmit = async(e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('name', productName[0].name )
        fd.append('status', productStatus )
        fd.append('price', +productPrice )
        fd.append('description', productDescription )
        fd.append('subcategory', productCategory[1] )
        fd.append('product_type', productType )
        fd.append('images', files )
        fd.append('location', productLocation )
        const ret = await fetch('http://localhost:8080/catalogue/sell', {
      method: 'POST',
      headers : {
          'Authorization' : 'Bearer ' + user.token,
      },
      body: fd
    })
    console.log('Status' , ret.status)
    const data = await ret.json()
    console.log('Data', data)
    }
    return (
        <div className="new-sale-info"><div className="sale-user-input">
                <form onSubmit={handleSubmit}>
                     <label >
                        <h2><FormattedMessage id='sale.productType'/></h2>
                       <SelectSearch options={[{value: 'console', name: 'Consola'} ,{value: 'videogame', name: 'Videojuego'}, {value: 'accesory', name: 'Accesorio'}]} search
        placeholder="Nombre" onChange={setProductType} value={productType}/>
                    </label>
                    <label >
                        <FormattedMessage id='sale.productName'/>
                        <br />
                      <NameVideoGameSelector setProductName={setProductName} />
                    </label>
                    <label >
                        <FormattedMessage id='sale.productPrice'/>
                        <br />
                        <input type="text" onChange={(e) => setProductPrice(e.target.value)}/>
                    </label>
                    <label >
                        <FormattedMessage id='sale.productLoc'/>
                        <br />
                        <LocationSelector  setProductLocation={setProductLocation}/>
                    </label>
                    <label >
                       <FormattedMessage id='sale.productStatus'/>
                        <br />
                        <SelectSearch options={[{value: 'casi nuevo', name: 'casi nuevo'} , {value: 'usado', name: 'usado'}, {value: 'muy desgastado', name: 'muy desgastado'}]} search
        placeholder="Nombre" onChange={setProductStatus} />
                    </label>
                    
                    <label >
                        <FormattedMessage id='sale.productCat'/>
                        <br />
                        <CatSelector setProductCategory={setProductCategory} productName={productName}  />
                    </label>
                    <label >
                        <FormattedMessage id='sale.productDescrip'/>
                        <br />
                        <textarea cols="30" rows="10" onChange={(e) => setProductDescription(e.target.value)}></textarea>
                    </label>
                    <button>Crea tu venta</button>
                </form>
            </div></div>
    )
}

export default NewSaleInfo