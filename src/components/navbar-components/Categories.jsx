import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'

const Categories = ({typeIndex, setCategoryIndex, showSubcategories}) => {

  const categories = {
    consoles : ['sony', 'nintendo', 'microsoft', 'atari', 'sega'],
    videogames: ['sony', 'nintendo', 'microsoft', 'atari', 'sega'],
    accesories: ['algo', 'otra', 'otro'],
  }

  const handleClick = (i) => {
    setCategoryIndex(i)
    showSubcategories()
  }

  return <>
    {typeIndex === 0 && <ul >
      {categories.consoles.map((t, i) => 
      <li>
        <Link to="#">{t}</Link>
        <FontAwesomeIcon icon={faChevronRight} onClick={() => handleClick(i)}></FontAwesomeIcon>
      </li> )}
    </ul>}
    {typeIndex === 1 && <ul >
      {categories.videogames.map((t, i) => 
      <li>
        <Link to="#">{t}</Link>
        <FontAwesomeIcon icon={faChevronRight} onClick={() => handleClick(i)}></FontAwesomeIcon>
      </li> )}
    </ul>}
    {typeIndex === 2 && <ul >
      {categories.accesories.map((t, i) => 
      <li>
        <Link to="#">{t}</Link>
        <FontAwesomeIcon icon={faChevronRight} onClick={() => handleClick(i)}></FontAwesomeIcon>
      </li> )}
    </ul>}
  </>
}

export default Categories
