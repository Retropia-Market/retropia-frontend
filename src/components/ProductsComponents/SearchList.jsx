import useFetch from '../../hooks/useFetch';
import ProductCard from '../ProductCard';
import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';

const SearchList = () => {
  const { q } = useParams();

  const apiURL = `http://localhost:8080/search/${q}`;

  const [results] = useFetch(apiURL);

  return (
    <div className="catalogue">
      <div className="upper">
        <h1>
          <FormattedMessage id="search.title" />
        </h1>
        <hr className="horizontal-rule" />
      </div>
      <div className="catalogue-products">
        {results &&
          results.map((product) => {
            return <ProductCard data={product} key={product.id} />;
          })}
      </div>
    </div>
  );
};

export default SearchList;
