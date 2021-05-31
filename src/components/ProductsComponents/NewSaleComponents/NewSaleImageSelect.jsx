import { useState } from "react"
import { FormattedMessage } from "react-intl"

const NewSaleImageSelect = ({setImageAdded, files, setFiles}) => {
    const [previews, setPreviews] = useState([])

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
    

    return(
        <div className="image-select">
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
        </div>
    )
}

export default NewSaleImageSelect