import { FormattedNumber } from 'react-intl';
import {Link, useHistory} from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import productPlaceholder from '../img/colorPlaceholder.svg';

const ProductCard = ({data}) => {

    const history = useHistory()

    const {seller, name, status, price, images, id, seller_id} = data;
    const results = useFetch(`http://localhost:8080/user/${seller_id}/rating` );

    const handleOnClick = () => {
        history.push('/catalogue/'+ data.id)

    }




    if(!data) return;

    return (
        <div className="product-card">
                <div className="product-card-img" onClick={handleOnClick} style={{backgroundImage: data.images[0]?.url ? `url(http:/\/\localhost:8080/${data.images[0]?.url})` : `url(${productPlaceholder})`}}></div>
            <div className="product-card-info">
                <div className="product-card-info-name-price">
                    <span className='product-card-info-name'>{name}</span>
                    <span className='product-card-info-price'><FormattedNumber style="currency" value={price} currency="EUR" /></span>
                </div>
                <div className="product-card-info-user">
                    <span className='product-card-info-status'>{status}</span>
                    <span className='product-card-info-seller'>{seller}</span>
                    <span className='product-card-info-average-rating'>{results[0]?.review_average}</span>
                    <span className='product-card-info-total-ratings'>({results[0]?.total_review})</span>
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