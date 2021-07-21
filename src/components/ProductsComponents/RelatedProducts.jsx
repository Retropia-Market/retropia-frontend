import useFetch from '../../hooks/useFetch';
import ProductCard from '../ProductCard';
import { FormattedMessage } from 'react-intl';

const RelatedProducts = ({ data }) => {
  const apiURL = `http://15.188.133.89:8080/catalogue/seemore/${data?.Subcategoria}`;

  const [results_data] = useFetch(apiURL);

  return (
    <div className="catalogue ">
      {results_data?.length > 1 && (
        <>
          {' '}
          <h1 className="main-title">
            <FormattedMessage id="prod.related" />
            <span className="main-title-row"></span>
          </h1>
          <div className="catalogue-products">
            {results_data
              .filter((p, i) => p.id !== data.id && i < 4)
              .map((product) => (
                <ProductCard data={product} key={product.id} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RelatedProducts;
