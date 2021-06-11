import useFetch from '../../hooks/useFetch';
import ImageGallery from 'react-image-gallery';

const ProductScreenShots = ({ query, type }) => {
    console.log(query);
    console.log(type);
    const apiURL = `http://localhost:8080/rawg/search/${query}`;
    const [results] = useFetch(apiURL);
    console.log(results);

    if (!results || !results?.count || type === 'console') return null;

    let filteredResults;
    if (type === 'videogame' && results) {
        filteredResults = results.results.filter((game) => game.name === query);
    }

    console.log(filteredResults);
    return (
        <div className="data-sheet">
            {filteredResults && type === 'videogame' && (
                <>
                    <h3>Ficha técnica del producto</h3>
                    <div className="data-sheet-inf">
                        <span>
                            Metacritic :{' '}
                            <span className="metacritic-score">
                                {filteredResults[0]?.metacritic}
                            </span>
                        </span>
                        <div className="img-gallery">
                            <ImageGallery
                                autoPlay
                                items={
                                    filteredResults &&
                                    filteredResults[0] &&
                                    filteredResults[0]?.short_screenshots.map(
                                        (p) => {
                                            return {
                                                original: p.image,
                                                thumbnail: p.image,
                                            };
                                        }
                                    )
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
