import useFetch from "../hooks/useFetch"
import ProductCard from "./ProductCard"
import '../styles/Products.css'
import { FormattedMessage } from "react-intl"


const ProductList = ({type}) => {

    const apiURL = 'http://localhost:8080/catalogue'

    const [results] = useFetch(apiURL)


    return (
        <div className="catalogue">
            <h1><FormattedMessage id="catalogue.title" /></h1>
            <div className="catalogue-products">
                {results && results.filter(product => product.product_type === type).map((product) => {
               return <ProductCard data={product} key={product.id}/>
            })}
            </div>
        </div>
    )
}


export default ProductList