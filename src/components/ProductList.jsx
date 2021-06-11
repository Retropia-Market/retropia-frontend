import useFetch from '../hooks/useFetch';
import ProductCard from './ProductCard';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';

const ProductList = ({ type }) => {
  const {category, subcategory} = useParams()
  const apiURL = subcategory ? `http://localhost:8080/catalogue?subcategory=${subcategory}` : category ? `http://localhost:8080/catalogue?category=${category}` : `http://localhost:8080/catalogue` ;
  const [results] = useFetch(apiURL);

  return (
    <div className="catalogue">
      <h1>
        <FormattedMessage id="catalogue.title" />
      </h1>
      {results && <div className={ results.length > 3 ? "catalogue-products" : results.length > 1 ? 'catalogue-products two-products' : 'catalogue-products one-products'}>
        {results
            .filter((product) => product.product_type === type)
            .map((product) => {
              return <ProductCard data={product} key={product.id} />;
            })}
      </div>}
    </div>
  );
};

export default ProductList;
