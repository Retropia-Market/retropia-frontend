import useFetch from "../../hooks/useFetch"
import ProductCard from "../ProductCard"

const UserPublicInventory = ({uid}) => {

    const apiURL = `http://localhost:8080/users/${uid}/catalogue`
    
    const [results] = useFetch(apiURL)


    return (
        <div className="user-public-inventory">
            <div className="inventory">
            <h1>Productos a la venta</h1>
            <div className="inventory-products">
            {results && results.map((product) => {
                if(product.sale_status.toLowerCase() === 'en venta'){

                    return <ProductCard data={product}/>
                }
            })}
            </div>
            </div>
            <div className="inventory">
                <h1>Productos vendidos</h1>
                <div className="inventory-products sold">
                    {results && results.map((product) => {
                if(product.sale_status.toLowerCase() === 'vendido'){

                    return <ProductCard data={product}/>
                }
            })}
                </div>
            </div>
        </div>
    )
}

export default UserPublicInventory