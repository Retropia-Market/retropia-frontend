import useFetch from "../../hooks/useFetch"
import ProductCard from "../ProductCard"
import results from '../../mockData/catalogue.json'
import '../../styles/Products.css'


const Catalogue = () => {

    // const apiURL = 'http://localhost:8080/catalogue'

    // const [results,] = useFetch(apiURL)


    return (
        <div className="catalogue">
            <h1>Catálogo</h1>
            <div className="catalogue-products">
            {results[0]?.id && results.map((product) => {
               return <ProductCard data={product}/>
            })}
            </div>
        </div>
    )
}


export default Catalogue