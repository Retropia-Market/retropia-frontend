import useFetch from '../../hooks/useFetch';
import ImageGallery from 'react-image-gallery';
import { FormattedMessage } from 'react-intl';

const ProductScreenShots = ({ query, type, setMetacritic }) => {
  const apiURL = `http://15.188.133.89:8080/rawg/search/${query}`;
  const [results] = useFetch(apiURL);
  if (!results || !results?.count) return null;

  let filteredResults;
  if (type === 'videogame' && results) {
    filteredResults = results.results.filter((game) => game.name === query);
    setMetacritic(filteredResults[0]?.metacritic);
  }
  return (
    <div className="data-sheet">
      {filteredResults && type === 'videogame' && (
        <>
          <h3 className="main-title">
            <FormattedMessage id="sale.productTechnical" />
            <span className="main-title-row"></span>
          </h3>
          <div className="data-sheet-inf">
            <div className="img-gallery">
              <ImageGallery
                autoPlay
                items={
                  filteredResults &&
                  filteredResults[0] &&
                  filteredResults[0]?.short_screenshots.map((p) => {
                    return {
                      original: p.image,
                      thumbnail: p.image,
                    };
                  })
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreenShots;
