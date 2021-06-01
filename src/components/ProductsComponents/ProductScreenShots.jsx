import useFetch from '../../hooks/useFetch';

const ProductScreenShots = ({query, type}) => {
  const [data] = useFetch(`http://localhost:8080/rawg/search/${query}`);

  let filteredResults;

  if(type === 'videogame'){

     filteredResults = data ? data.results.filter(game => game.name === query): []
    console.log(filteredResults)
    
  } 
  else if (type === 'console'){
    
  }

  //ENDPOINT hecho
  //TODO - Sacar los datos necesarios para la ficha técnica, pero aun por decidir.

  return (
    <div className="data-sheet">
      <h3>Ficha técnica del producto</h3>
      {filteredResults && 
            <div className="data-sheet-inf">
                <span>{filteredResults.metacritic}</span>
                <div className="img-gallery">
                 { filteredResults.short_screenshots && 
                 filteredResults[0].short_screenshots.map(picture => {
                   <div className="screen-shots" style={{backgroundImage : `url(${picture.image})`}}></div>
                 })}
                </div>
                
            </div>
            }
    </div>
  );
};

export default ProductScreenShots;
