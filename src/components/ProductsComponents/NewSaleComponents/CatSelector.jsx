import SelectSearch from "react-select-search";
import useFetch from "../../../hooks/useFetch";

const CatSelector = ({productName, setProductCategory, productType}) => {
    const getFunOp = (query) => {
             if(!query) return []
                 return new Promise((resolve, reject) => {
                          fetch(`http://localhost:8080/categories`)
                             .then(response => response.json())
                             .then(( results ) => {
                                 if(results) {
                                     resolve(results.filter((category,i)=> category.name.toLowerCase().startsWith(query)).map((product) => ({ value: product.name, name: product.name.charAt(0).toUpperCase() + product.name.slice(1) })))
                                 } 
                                })
                             .catch(reject);
                 });  
     }


return (
    <div className="new-sale-selector">
        {productName  && productType !== 'accesory' ?  <SelectSearch options={productType === 'console' ? [{value: productName[0]?.name, name: productName[0]?.name }] :  productName[0]?.platforms.map((p, i) => ({value: [p.platform.id, p.platform.name], name: p.platform.name})) } search
        placeholder="Nombre"  debounce={1000}  onChange={setProductCategory} /> : productName && productType === 'accesory' ? 
        <SelectSearch options={[]} search placeholder="Nombre" onChange={setProductCategory} getOptions={getFunOp}/> :
        <SelectSearch options={[]} search placeholder="Nombre" onChange={setProductCategory} />}
          
    </div>
)
}

export default CatSelector