import useFetch from '../../hooks/useFetch';
import ProductCard from '../ProductCard';
import { FormattedMessage } from 'react-intl';

const RelatedProducts = ({ data }) => {
  const apiURL = `http://localhost:8080/catalogue/seemore/${data?.Subcategoria}`;

  const [results] = useFetch(apiURL);

  return (
    <div className="catalogue">
      <h1>
        <FormattedMessage id="prod.related" />
      </h1>
      <div className="catalogue-products">
        {results &&
          results.map((product) => {
            return <ProductCard data={product} key={product.id} />;
          })}
      </div>
    </div>
  );
};

export default RelatedProducts;
