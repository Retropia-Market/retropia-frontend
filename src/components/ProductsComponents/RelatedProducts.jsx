import useFetch from '../../hooks/useFetch';
import ProductCard from '../ProductCard';
import { FormattedMessage } from 'react-intl';

const RelatedProducts = ({ data }) => {
    const apiURL = `http://localhost:8080/catalogue/seemore/${data?.Subcategoria}`;

    const [results_data] = useFetch(apiURL);

    return (
        <div className="catalogue ">
            {results_data?.length > 1 && (
                <>
                    {' '}
                    <h1>
                        <FormattedMessage id="prod.related" />
                    </h1>
                    <div className="catalogue-products">
                        {results_data.map((product) => {
                            if (data.id !== product.id) {
                                return (
                                    <ProductCard
                                        data={product}
                                        key={product.id}
                                    />
                                );
                            }
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default RelatedProducts;
