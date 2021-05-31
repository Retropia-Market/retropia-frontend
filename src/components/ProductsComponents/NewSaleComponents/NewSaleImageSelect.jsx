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

     
     const handleSubmit = async(e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('image', files )
        const ret = await fetch('http://localhost:8080/sell/vision/', {
      method: 'POST',
      body: fd
    })
    if(ret.ok){
        const response = await ret.json()
        setImageAdded(true)
        console.log(response)

    }}
    

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
                <button className="agregar-imagen" onClick={handleSubmit}>Agregar Imagen</button>

            </div>
        </div>
    )
}

export default NewSaleImageSelect