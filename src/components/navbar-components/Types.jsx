import {Link} from 'react-router-dom'

const Types = ({ setTypeIndex}) =>{
  const types = [
    {id: 'consoles', name: 'consolas'},
    {id: 'videogames', name: 'videojuegos'},
    {id: 'accesories', name: 'perifericos'}
  ]
  
  const handleHover = i => {
    setTypeIndex(i)
  }

  return( 
    <div className="categories">
      {types.map((t, i) =>
      <Link to={'/catalogue/' + t.id} 
          key={i} 
          onMouseEnter={() => handleHover(i)}>
        {t.name}
      </Link>)}
    </div>
  )
}

export default Types