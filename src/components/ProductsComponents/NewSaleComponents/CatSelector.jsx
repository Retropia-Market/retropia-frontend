import SelectSearch from "react-select-search";

const CatSelector = ({productName, setProductCategory, productType}) => {


return (
    <div className="new-sale-selector">
        {productName ?  <SelectSearch options={productType === 'console' ? [{value: productName[0]?.name, name: productName[0]?.name }] : productName[0]?.platforms.map((p, i) => ({value: [p.platform.id, p.platform.name], name: p.platform.name}))} search
        placeholder="Nombre"  debounce={1000}  onChange={setProductCategory} /> : 
        <SelectSearch options={[]} search
        placeholder="Nombre" onChange={setProductCategory} />}
          
    </div>
)
}

export default CatSelector