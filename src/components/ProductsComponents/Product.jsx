import { useHistory, useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';
import ProductInfo from './ProductInfo';
import Location from '../Location';
import RelatedProducts from './RelatedProducts';
import ProductScreenShots from './ProductScreenShots';
import ErrorBoundary from '../../errors/ErrorBoundary';
import { motion } from 'framer-motion';
import { item } from '../animations';
import { useState } from 'react';

const Product = () => {
  const { id } = useParams();

  const apiURL = `http://15.188.133.89:8080/catalogue/${id}`;

  const [results] = useFetch(apiURL);

  const [metacritic, setMetacritic] = useState();

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
          <ProductInfo data={results} metacritic={metacritic} />
          <div className="locationimg">
            <Location place={results?.location} />
          </div>
          <ErrorBoundary>
            {results.name &&
              results.product_type &&
              results?.product_type === 'videogame' && (
                <ProductScreenShots
                  query={results?.name}
                  type={results?.product_type}
                  setMetacritic={setMetacritic}
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
