import useFetch from "../../hooks/useFetch"
import '../../styles/Products.css'


const ProductDataSheet = () => {

    const apiURL = 'http://localhost:8080/top'

    const [results] = useFetch(apiURL)


    return (
        <div className="data-sheet">
            <h3>Ficha técnica del producto</h3>
        </div>
    )
}


export default ProductDataSheet