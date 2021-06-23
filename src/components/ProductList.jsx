import useFetch from '../hooks/useFetch';
import ProductCard from './ProductCard';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { motion } from 'framer-motion';
import { container, item } from './animations';
import mario from '../img/mario.gif';

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
      <h1 className="main-title">
        <FormattedMessage id="catalogue.title" />
        <span className="main-title-row"></span>
      </h1>
      <div className="catalogue-inside">
        {results && (
          <motion.ul
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
                  product.sale_status.toLowerCase() === 'en venta'
              )
              .map((product) => {
                return <ProductCard data={product} key={product.id} />;
              })}
          </motion.ul>
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
              <img src={mario} alt="Mario corriendo" width="100px"></img>
              <p>
                <FormattedMessage id="catalogue.notfound" />
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
