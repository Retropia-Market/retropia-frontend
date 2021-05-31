import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';
import ProductInfo from './ProductInfo';
import Location from '../Location';
import ProductDataSheet from './ProductDataSheet';
import RelatedProducts from './RelatedProducts';

const Product = () => {
  const { id } = useParams();

  const apiURL = `http://localhost:8080/catalogue/${id}`;

  const [results] = useFetch(apiURL);

  return (
    <div className="single-product-page">
      <ProductInfo data={results} />
      <Location place={results?.location} />
      <ProductDataSheet />
      <RelatedProducts data={results} />
    </div>
  );
};

export default Product;
