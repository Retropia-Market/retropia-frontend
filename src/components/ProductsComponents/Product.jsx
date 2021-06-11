import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';
import ProductInfo from './ProductInfo';
import Location from '../Location';
import RelatedProducts from './RelatedProducts';
import ProductScreenShots from './ProductScreenShots';
import ImageGallery from 'react-image-gallery';

const Product = () => {
  const { id } = useParams();

  const apiURL = `http://localhost:8080/catalogue/${id}`;

  const [results] = useFetch(apiURL);

  return (<>
    {results && <div className="single-product-page">
      <ProductInfo data={results} />
      <div className="locationimg">
      <Location place={results?.location} />
             </div>
      <ProductScreenShots  query={results?.name} type={results?.product_type}/>
      <RelatedProducts data={results} />
    </div>}
    </>
  );
};

export default Product;
