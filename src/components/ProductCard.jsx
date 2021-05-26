import {Link} from 'react-router-dom'

const ProductCard = ({data}) => {

    const {seller, name, status, price, images, id, seller_id} = data;




    if(!data) return;

    return (
        <div className="product-card">
                <div className="product-card-img" style={{backgroundImage: `url(${images[0]})`}}></div>
            <div className="product-card-info">
                <div className="product-card-info-name-price">
                    <span className='product-card-info-name'>{name}</span>
                    <span className='product-card-info-price'>{price} €</span>
                </div>
                <div className="product-card-info-user">
                    <span className='product-card-info-status'>{status}</span>
                    <span className='product-card-info-seller'>{seller}</span>
                    <span className='product-card-info-average-rating'>4.5</span>
                    <span className='product-card-info-total-ratings'>(23)</span>
                </div>
                <div className="product-card-info-icons">
                    <Link to='/'>🤍</Link>
                    <Link to='/'>💬</Link>
                    <Link to='/'>🛍️</Link>
                </div>
            </div>
        </div>
    )

}


export default ProductCard