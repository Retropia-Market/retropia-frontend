import useFetch from '../hooks/useFetch';
import ProductCard from './ProductCard';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { container, item } from './animations';

const ProductList = ({ type }) => {
    const { category, subcategory } = useParams();
    const apiURL = subcategory
        ? `http://localhost:8080/catalogue?subcategory=${subcategory}`
        : category
        ? `http://localhost:8080/catalogue?category=${category}`
        : `http://localhost:8080/catalogue`;
    const [results] = useFetch(apiURL);

    return (
        <div className="catalogue">
            <h1>
                <FormattedMessage id="catalogue.title" />
            </h1>
            <div className="catalogue">
                {results && (
                    <motion.div
                        variants={container}
                        animate="visible"
                        initial="hidden"
                        exit="hidden"
                        className={
                            results.length > 3
                                ? 'catalogue-products'
                                : results.length > 1
                                ? 'catalogue-products two-products'
                                : 'catalogue-products one-products'
                        }
                    >
                        {results
                            .filter(
                                (product) =>
                                    product.product_type === type &&
                                    product.sale_status.toLowerCase() ===
                                        'en venta'
                            )
                            .map((product) => {
                                return (
                                    <ProductCard
                                        data={product}
                                        key={product.id}
                                    />
                                );
                            })}
                    </motion.div>
                )}
                {results?.filter(
                    (product) =>
                        product.product_type === type &&
                        product.sale_status.toLowerCase() === 'en venta'
                )?.length === 0 && (
                    <div className="error-container">
                        <motion.div
                            variants={container}
                            animate="visible"
                            initial="hidden"
                            exit="hidden"
                            className="no-products"
                        >
                            🙈 Oops! Por acá no hay nada.
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
