import SelectSearch from 'react-select-search';

const NameConsoleSelector = ({ setProductName }) => {
  const getFunOp = (query) => {
    if (!query) return [];
    return new Promise((resolve, reject) => {
      fetch(`https://api.retropia-market.com/rawg/platform`)
        .then((response) => response.json())
        .then(({ results }) => {
          if (results) {
            resolve(
              results
                .filter(
                  (console, i) =>
                    console.name.toLowerCase().indexOf(query.toLowerCase()) !==
                    -1
                )
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
        placeholder="Nombre de tu consola"
        debounce={100}
        onChange={setProductName}
      />
    </div>
  );
};

export default NameConsoleSelector;
