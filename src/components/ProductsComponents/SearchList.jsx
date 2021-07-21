import useFetch from '../../hooks/useFetch';
import ProductCard from '../ProductCard';
import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { motion } from 'framer-motion';
import { container } from '../animations';

const SearchList = () => {
  const { q } = useParams();

  const apiURL = `http://15.188.133.89:8080/search/${q}`;

  const [results] = useFetch(apiURL);

  return (
    <div className="catalogue">
      <h1 className="main-title">
        <FormattedMessage id="search.title" />
        <span className="main-title-row"></span>
      </h1>
      <div className="catalogue-inside">
        <motion.ul
          variants={container}
          animate="visible"
          initial="hidden"
          exit="hidden"
          className="catalogue-products"
        >
          {results &&
            results.map((product) => {
              return <ProductCard data={product} key={product.id} />;
            })}
        </motion.ul>
      </div>
    </div>
  );
};

export default SearchList;
