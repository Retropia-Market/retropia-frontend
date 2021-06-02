import useFetch from '../../hooks/useFetch';

const ProductScreenShots = ({query, type}) => {

  const apiURL = type === 'videogame' ? `http://localhost:8080/rawg/search/${query}` : `http://localhost:8080/rawg/platform`
  const [results] = useFetch(apiURL);
  
  let filteredResults;
  
  if(type === 'videogame' && results){
    
     filteredResults = results ? results.results.filter(game => game.name === query): []
    console.log(filteredResults[0].short_screenshots)
    
  } 
  else if (type === 'console' && results){
    
    }
  return (
    <div className="data-sheet">
      <h3>Ficha técnica del producto</h3>
      {filteredResults && 
            <div className="data-sheet-inf">
                <span>Metacritic : <span className='metacritic-score'>{filteredResults[0].metacritic}</span></span>
                <div className="img-gallery">
                 {
                 filteredResults[0].short_screenshots.map(picture => {
                  return <div className="screen-shots" style={{backgroundImage : `url(${picture.image})`}}></div>
                 })}
                </div>
                
            </div>
            }
    </div>
  );
};

export default ProductScreenShots;
