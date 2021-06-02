import { useState } from "react"
import { FormattedMessage } from "react-intl"
import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import SelectSearch from "react-select-search"
import CatSelector from "./CatSelector"
import LocationSelector from "./LocationSelector"
import NameConsoleSelector from "./NameConsoleSelector"
import NameVideoGameSelector from "./NameVideoGameSelector"

const NewSaleInfo = ({files, setProductLocation, productLocation ,productType, setProductType}) => {

     
    const [productName, setProductName] = useState()
    const [productStatus, setProductStatus] = useState()
    const [productPrice, setProductPrice] = useState()
    const [productDescription, setProductDescription] = useState()
    
    const [productCategory, setProductCategory] = useState([])

    const [redirect, setRedirect] = useState(false)
    

    const user = useSelector(s => s.user)


    const handleSubmit = async(e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('name', productName[0].name )
        fd.append('status', productStatus )
        fd.append('price', +productPrice )
        fd.append('description', productDescription )
        fd.append('subcategory', productType === 'console' ? productCategory.toLowerCase() :productCategory[1].toLowerCase() )
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
    if(ret.ok){
        setRedirect(true)
    }
    console.log(ret)
    }
    return (
        <div className="new-sale-info"><div className="sale-user-input">
            {redirect && <Redirect to='/'/>}
                <form onSubmit={handleSubmit}>
                     <label >
                        <h2><FormattedMessage id='sale.productType'/></h2>
                       <SelectSearch options={[{value: 'console', name: 'Consola'} ,{value: 'videogame', name: 'Videojuego'}, {value: 'accesory', name: 'Accesorio'}]} search
        placeholder="Nombre" onChange={setProductType} value={productType}/>
                    </label>
                    <label >
                        <FormattedMessage id='sale.productName'/>
                        <br />
                      {productType === 'console' ? <NameConsoleSelector setProductName={setProductName} productType={productType}/> : <NameVideoGameSelector setProductName={setProductName} productType={productType}/>}
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
                        <SelectSearch options={[{value: 'Nuevo', name: 'Nuevo'} , {value: 'semi nuevo', name: 'Semi nuevo'}, {value: 'usado', name: 'Usado'}, {value: 'deteriorado', name: 'Deteriorado'}, {value: 'recambio', name: 'Recambio'}]} search
        placeholder="Nombre" onChange={setProductStatus} />
                    </label>
                    
                    <label >
                        <FormattedMessage id='sale.productCat'/>
                        <br />
                        <CatSelector setProductCategory={setProductCategory} productName={productName}  productType={productType}/>
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