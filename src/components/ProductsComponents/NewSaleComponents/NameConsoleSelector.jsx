import SelectSearch from "react-select-search";

const NameConsoleSelector = ({setProductName}) => {
    const getFunOp = (query) => {
        if(!query) return []
            return new Promise((resolve, reject) => {
                     fetch(`http://localhost:8080/rawg/platform`)
                        .then(response => response.json())
                        .then(( {results} ) => {
                            if(results) {
                                resolve(results.filter((console,i)=> console.name.toLowerCase().startsWith(query)).map((product, i) => ({ value: [product, i], name: product.name })))
                            } 
                           })
                        .catch(reject);
            });
}
        

return (
    <div className="new-sale-selector">
          <SelectSearch options={[]} getOptions={getFunOp} search
        placeholder="Nombre"  debounce={1000}  onChange={setProductName} />
    </div>
)
}

export default NameConsoleSelector