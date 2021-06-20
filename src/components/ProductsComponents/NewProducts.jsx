import useFetch from '../../hooks/useFetch';
import ProductCard from '../ProductCard';
import { FormattedMessage } from 'react-intl';

const TopProducts = () => {
    const apiURL = 'http://localhost:8080/new';

    const [results] = useFetch(apiURL);

    return (
        <div className="catalogue most-viewed">
            <h1>
                <FormattedMessage id="top.new" />
            </h1>
            <div className="catalogue-products">
                {results &&
                    results
                        .filter(
                            (product) =>
                                product.sale_status.toLowerCase() === 'en venta'
                        )
                        .map((product) => {
                            return (
                                <ProductCard data={product} key={product.id} />
                            );
                        })}
            </div>
        </div>
    );
};

export default TopProducts;
