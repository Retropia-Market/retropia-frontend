import useFetch from '../../hooks/useFetch';
import ProductCard from '../ProductCard';
import { FormattedMessage } from 'react-intl';

const TopProducts = () => {
  const apiURL = 'http://15.188.133.89:8080/top';

  const [results] = useFetch(apiURL);

  return (
    <>
      {results && results?.length !== 0 && (
        <div className="catalogue most-viewed">
          <h1 className="main-title">
            <FormattedMessage id="top.title" />
            <span className="main-title-row"></span>
          </h1>
          <div className="catalogue-products">
            {results &&
              results
                .filter(
                  (product) => product.sale_status.toLowerCase() === 'en venta'
                )
                .map((product) => {
                  return <ProductCard data={product} key={product.id} />;
                })}
          </div>
        </div>
      )}
    </>
  );
};

export default TopProducts;
