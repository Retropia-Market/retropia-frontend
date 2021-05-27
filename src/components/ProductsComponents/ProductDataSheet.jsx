import useFetch from "../../hooks/useFetch"
import '../../styles/Products.css'


const ProductDataSheet = () => {

    const apiURL = 'http://localhost:8080/top'

    const [results] = useFetch(apiURL)


    return (
        <div className="catalogue">
        </div>
    )
}


export default ProductDataSheet