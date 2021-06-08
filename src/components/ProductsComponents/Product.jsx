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
     {results.images.length > 1 &&  <ImageGallery items={results.images.slice(1).map(p => {
             return {original : `http:/\/\localhost:8080/${p.url}`, thumbnail: `http:/\/\localhost:8080/${p.url}`}})}/> }
             </div>
      <ProductScreenShots  query={results?.name} type={results?.product_type}/>
      <RelatedProducts data={results} />
    </div>}
    </>
  );
};

export default Product;
