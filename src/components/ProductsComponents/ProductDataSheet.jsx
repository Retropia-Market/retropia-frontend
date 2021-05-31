import { useEffect, useState } from "react"
import '../../styles/Products.css'


const ProductDataSheet = () => {

    

    const [results, setResults] = useState()

    //ENDPOINT hecho
    //TODO - Sacar los datos necesarios para la ficha técnica, pero aun por decidir.

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