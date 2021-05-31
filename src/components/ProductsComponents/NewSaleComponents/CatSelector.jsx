import SelectSearch from "react-select-search";

const CatSelector = ({productName, setProductCategory}) => {


return (
    <div className="new-sale-selector">
        {productName ?  <SelectSearch options={productName[0]?.platforms.map((p, i) => ({value: [p.platform.id, p.platform.name], name: p.platform.name}))} search
        placeholder="Nombre"  debounce={1000}  onChange={setProductCategory} /> : 
        <SelectSearch options={[]} search
        placeholder="Nombre" onChange={setProductCategory} />}
          
    </div>
)
}

export default CatSelector