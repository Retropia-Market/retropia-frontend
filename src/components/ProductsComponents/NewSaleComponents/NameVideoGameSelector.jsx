import SelectSearch from 'react-select-search';

const NameVideoGameSelector = ({ setProductName }) => {
  const getFunOp = (query) => {
    if (!query) return [];
    return new Promise((resolve, reject) => {
      fetch(`https://api.retropia-market.com/rawg/search/${query}`)
        .then((response) => response.json())
        .then(({ results }) => {
          if (results) {
            resolve(
              results
                .filter((_, i) => i < 10)
                .map((product, i) => ({
                  value: [product, i],
                  name: product.name,
                }))
            );
          }
        })
        .catch(reject);
    });
  };

  return (
    <div className="new-sale-selector">
      <SelectSearch
        options={[]}
        getOptions={getFunOp}
        search
        placeholder="Nombre de tu videojuego"
        debounce={100}
        onChange={setProductName}
      />
    </div>
  );
};

export default NameVideoGameSelector;
