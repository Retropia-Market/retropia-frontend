import {useHistory} from 'react-router-dom'
import useFetch from '../../hooks/useFetch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'

const Categories = ({hideCategories, showSubcategories, setCategoryIndex, category, setCategory, type = {id :'consoles'}}) => {
  const [allCategories] = useFetch('http://localhost:8080/categories')
  const history = useHistory()

  const handleClick = (i,c) => {
    setCategoryIndex(i + 1)
    setCategory(c)
    history.push(`/catalogue/${type.id}/${c}`);
    hideCategories()
    showSubcategories()
  }
  return <>
      {!allCategories && <li>cargando...</li>} 
      
      {allCategories?.reduce((acc, c) => 
        acc.includes(c.categoria) ? acc : [...acc, c.categoria]  ,[]).map((c,i) =>
          <li className="category" key={i} onClick={() => handleClick(i, c)}>
            <div className="category-name">{c}</div>
            <FontAwesomeIcon className="category-select" icon={faChevronRight} ></FontAwesomeIcon>
          </li> )}
    </>
}

export default Categories
