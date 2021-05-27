import useFetch from '../../hooks/useFetch';
import '../../styles/Products.css'


const ProductInfo = ({data}) => {

    const results = useFetch(`http://localhost:8080/user/${data?.seller_id}/rating` );
    
    if(data?.error) {
        return <div><h1>El producto no existe</h1></div>}
        
        return (
        <>
        {data && <div className="product-main-page">
            <div className="product-img" style={{backgroundImage: `url(https://via.placeholder.com/150)`}}></div>
            <div className="product-info">
                <h3>{data.name}</h3>
                <div className="seller-info">
                    
                    <div className="seller-icon">ICON</div>
                    <div className="seller-name">{data.seller}</div>
                    <div className="review-average">{results.review_average}</div>
                    <div className="total-review">{results.total_review}</div>
                </div>
                <div className="status-fav-price-bar">
                    <div className="fav-icon">FAV ICON</div>
                    <div className="product-status">{data.status}</div>
                    <div className="price">{data.price}</div>
                </div>
                <div className="product-description">
                   {data.description}
                </div>
                <div className="bid-message-buttons">
                    <button className='button sell-button'>Mensaje</button>
                    <button className='button bid-button'>Oferta</button>

                </div>
                
            </div>
        </div>}
        </>
    )
}


export default ProductInfo