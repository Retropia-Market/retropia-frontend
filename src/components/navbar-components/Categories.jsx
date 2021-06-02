import {Link} from 'react-router-dom'
import useFetch from '../../hooks/useFetch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'

const Categories = ({hideCategories, showSubcategories, setCategoryIndex}) => {
  const [allCategories] = useFetch('http://localhost:8080/categories')

  const handleClick = (i) => {
    setCategoryIndex(i)
    hideCategories()
    showSubcategories()
  }

  return <>
      {!allCategories && <li>cargando...</li>} 
      
      {allCategories?.reduce((acc, c) => 
        acc.includes(c.categoria) ? acc : [...acc, c.categoria]  ,[]).map((c,i) =>
          <li className="category" key={i}>
            <Link className="category-name" to="#">{c}</Link>
            <FontAwesomeIcon className="category-select" icon={faChevronRight} onClick={() => handleClick(i)}></FontAwesomeIcon>
          </li> )}
    </>
}

export default Categories
