import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'

const Subcategories = ({ categoryIndex, hideSubcategories, showCategories}) => {

  const [allCategories] = useFetch('http://localhost:8080/categories')

  const handleClick = () => {
    hideSubcategories()
    showCategories()
  }
  console.log('categoryIndex: ' + categoryIndex )

  return <> 
    <FontAwesomeIcon className="category-select" icon={faChevronLeft} onClick={handleClick}></FontAwesomeIcon>
    {!allCategories && <li>cargando...</li> }
    {allCategories?.filter(c => c.category_id === categoryIndex).map(c => 
      <li className="category" key={c.id}>
        <Link className="category-name" to="#">{c.name}</Link>
      </li>
      )}
  </>
}

export default Subcategories