import { useEffect, useState } from "react"
import '../../styles/Products.css'


const ProductDataSheet = () => {

    const apiURL = 'https://api.igdb.com/v4/games/'

    const [results, setResults] = useState()

    return (
        <div className="data-sheet">
            <h3>Ficha técnica del producto</h3>
            {/* {results && 
            <div className="data-sheet-inf">
                <span></span>
            </div>
            } */}
        </div>
    )
}


export default ProductDataSheet