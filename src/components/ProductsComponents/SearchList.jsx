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
        <h1 className="main-title">
          <FormattedMessage id="search.title" />
          <span className="main-title-row"></span>
        </h1>
      <div className="catalogue-inside">
        {results &&
          results.map((product) => {
            return <ProductCard data={product} key={product.id} />;
          })}
      </div>
    </div>
  );
};

export default SearchList;
