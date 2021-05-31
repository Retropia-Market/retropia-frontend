import { useState } from "react"
import { FormattedMessage } from "react-intl"

const NewSale = () => {

    const [imageAdded, setImageAdded] = useState(false)
    const [files, setFiles] = useState([])
    const [previews, setPreviews] = useState([])
    const [productName, setProductName] = useState()
    const [productStatus, setProductStatus] = useState()
    const [productPrice, setProductPrice] = useState()
    const [productDescription, setProductDescription] = useState()
    const [productLocation, setProductLocation] = useState()
    const [productCategory, setProductCategory] = useState()
    const [productType, setProductType] = useState()
    
    const handleFile = e => {
        const l = Array.from(e.target.files)
        setFiles(...l)
        setPreviews([...l.map(f => URL.createObjectURL(f))])
        e.target.value = null
    }
    
    const handleClick = i => {
        setFiles(files.filter((_, j) => i !== j))
        setPreviews(previews.filter((_, j) => i !== j))
    }
    
    const handleClickApi = (e) => {
        e.preventDefault()
        setImageAdded(true)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('name', )
    }

    return (
        <div className="new-sale">
            <div className="add-first-image">
            {previews.map((preview, i) =>
             <div
            className="image"
            style={{ backgroundImage: `url(${preview})` }}
            onClick={() => handleClick(i)}
            key={i}
             />
                )}
                <label htmlFor="">
                <h2><FormattedMessage id='sale.imgTitle'/></h2>
                <input type="file" onChange={handleFile}/>
                <h3><FormattedMessage id='sale.imgDescription'/></h3>
                </label>
                <button className="agregar-imagen" onClick={handleClickApi}>Agregar Imagen</button>

            </div>
            {imageAdded && 
            <div className="sale-user-input">
                <form >
                    <label >
                        <FormattedMessage id='sale.productName'/>
                        <br />
                        <input type="text" onChange={(e) => setProductName(e.target.value)}/>
                    </label>
                    <label >
                        <FormattedMessage id='sale.productPrice'/>
                        <br />
                        <input type="text" onChange={(e) => setProductName(e.target.value)}/>
                    </label>
                    <label >
                       <FormattedMessage id='sale.productStatus'/>
                        <br />
                        <input type="text" onChange={(e) => setProductStatus(e.target.value)}/>
                    </label>
                    <label >
                        <FormattedMessage id='sale.productType'/>
                        <br />
                        <input type="text" onChange={(e) => setProductType(e.target.value)} />
                    </label>
                    <label >
                        <FormattedMessage id='sale.productCat'/>
                        <br />
                        <input type="text" onChange={(e) => setProductCategory(e.target.value)}/>
                    </label>
                    <label >
                        <FormattedMessage id='sale.productDescrip'/>
                        <br />
                        <textarea cols="30" rows="10" onChange={(e) => setProductDescription(e.target.value)}></textarea>
                    </label>
                </form>
            </div>}


        </div>
    )
}


export default NewSale