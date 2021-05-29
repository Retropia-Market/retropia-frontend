import { useState } from 'react'
import {Link} from 'react-router-dom'

const Types = () =>{
  const [selected ,setSelected] = useState(null)

  const types = [
    {id: 'consoles', name: 'consolas'},
    {id: 'videogames', name: 'videojuegos'},
    {id: 'accesories', name: 'perifericos'}
  ]

  const handleClick = (i) => {
    setSelected(i)
  }

  return( 
      types.map((t, i) =>
    <div className={`types ${selected === i ? 'selected' : ''}`}>
      <Link onClick={() => handleClick(i)} 
        className= "types-names" 
        to={'/catalogue/' + t.id} key={i}>
          {t.name}
      </Link>
      </div>
      )
  )
}

export default Types