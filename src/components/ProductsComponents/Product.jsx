import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';
import ProductInfo from './ProductInfo';
import Location from '../Location';
import RelatedProducts from './RelatedProducts';
import ProductScreenShots from './ProductScreenShots';
import ErrorBoundary from '../../errors/ErrorBoundary';
import { motion } from 'framer-motion';
import { item } from '../animations';

const Product = () => {
  const { id } = useParams();

  const apiURL = `http://localhost:8080/catalogue/${id}`;

  const [results] = useFetch(apiURL);
  return (
    <div className="outside-box">
      {results && (
        <motion.div
          variants={item}
          animate="visible"
          initial="hidden"
          exit="hidden"
          className="single-product-page"
        >
          <ProductInfo data={results} />
          <div className="locationimg">
            <Location place={results?.location} />
          </div>
          <ErrorBoundary>
            {results.name && results.product_type && (
              <ProductScreenShots
                query={results?.name}
                type={results?.product_type}
              />
            )}
          </ErrorBoundary>
          <RelatedProducts data={results} />
        </motion.div>
      )}
    </div>
  );
};

export default Product;
