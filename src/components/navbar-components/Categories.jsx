import {useHistory} from 'react-router-dom'
import useFetch from '../../hooks/useFetch';

const Categories = ({hideCategories, showSubcategories, setCategoryIndex, setCategory, type = {id :'consoles'}}) => {
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
      {!allCategories && <li className="category">cargando...</li>} 
      
      {allCategories?.reduce((acc, c) => 
        acc.includes(c.categoria) ? acc : [...acc, c.categoria]  ,[]).map((c,i) =>
          <li className="category" key={i} onClick={() => handleClick(i, c)}>
            <div className="category-name">{c}</div>
          </li> )}
    </>
}

export default Categories
