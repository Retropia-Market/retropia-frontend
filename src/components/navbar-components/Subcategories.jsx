import {  useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'

const Subcategories = ({ categoryIndex, hideSubcategories, showCategories, type , category}) => {

  const [allCategories] = useFetch('http://localhost:8080/categories')
  const history = useHistory()

  const handleClick = () => {
    hideSubcategories()
    showCategories()
  }

   const handleClickSubcategories = (c) => {
    history.push(`/catalogue/${type.id}/${category}/${c.name}`);
  }

  return <> 
    <FontAwesomeIcon className="category-select" icon={faChevronLeft} onClick={handleClick}></FontAwesomeIcon>
    {!allCategories && <li>cargando...</li> }
    {allCategories?.filter(c => c.category_id === categoryIndex).map(c => 
      <li className="category" key={c.id} onClick={(e) => handleClickSubcategories(c)}>
        <div className="category-name" >{c.name}</div>
      </li>
      )}
  </>
}

export default Subcategories