import SelectSearch from 'react-select-search';

const LocationSelector = ({ setProductLocation }) => {
  const getFunOp = (query) => {
    if (!query) return [];
    return new Promise((resolve, reject) => {
      fetch(`http://15.188.133.89:8080/sell/autocomplete/${query}`)
        .then((response) => response.json())
        .then((results) => {
          if (results) {
            resolve(
              results
                .filter((_, i) => i < 8)
                .map((location, i) => ({
                  value: location.description,
                  name: location.description,
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
        placeholder="Lugar donde resides actualmente"
        debounce={100}
        onChange={setProductLocation}
      />
    </div>
  );
};

export default LocationSelector;
