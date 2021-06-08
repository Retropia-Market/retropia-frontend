import {Link, useLocation} from 'react-router-dom'

const Types = ({typeIndex, setTypeIndex, setType}) =>{
  const {pathname} = useLocation()

  const types = [
    {id: 'consoles', name: 'consolas'},
    {id: 'videogames', name: 'videojuegos'},
    {id: 'accesories', name: 'perifericos'}
  ]

  const handleClick = (i) => {
    setTypeIndex(i)
    setType(types[i])
  }

  return( 
      types.map((t, i) =>
    <div key={i}
      onClick={() => handleClick(i)}
      className={`type ${(typeIndex === i && pathname === `/catalogue/${t.id}` ) ? 'selected' : ''}`}>
      <Link 
        className= "type-name" 
        to={'/catalogue/' + t.id} key={i}>
          {t.name}
      </Link>
      </div>
      )
  )
}

export default Types