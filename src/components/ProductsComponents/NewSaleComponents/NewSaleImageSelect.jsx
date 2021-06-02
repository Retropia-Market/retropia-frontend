import { useState } from "react"
import { FormattedMessage } from "react-intl"
import { useSelector } from "react-redux"

const NewSaleImageSelect = ({setImageAdded, files, setFiles, setProductType}) => {
    const [previews, setPreviews] = useState([])
    const user = useSelector(s => s.user)
    

    const handleFile = e => {
        const l = Array.from(e.target.files)
        setFiles(...l)
        setPreviews([...l.map(f => URL.createObjectURL(f))])
    }
    
    const handleClick = i => {
        setFiles(files.filter((_, j) => i !== j))
        setPreviews(previews.filter((_, j) => i !== j))
    }

    const handleTypeData = (visionData) => {

        // const wordsArray = visionData.map(data => data.name.toLowerCase().split(' ')).flatMap(v => v)
        
        // for (let word of wordsArray){
        //    if(word === 'console'){
        //        return 'console'
        //    }
        //    else if(word === 'controller'){
        //        return 'accesory'
        //    }
        // }
        // return 'videogame';
        return 'videogame';
        
    }

     
     const handleSubmit = async (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('image', files )
        const ret = await fetch('http://localhost:8080/sell/vision/', {
      method: 'POST',
      headers : {
          'Authorization' : 'Bearer ' + user.token,
      },
      body: fd
    })
    if(ret.ok){
        const response = await ret.json()
        // setProductType(handleTypeData(response))
        setImageAdded(true)

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