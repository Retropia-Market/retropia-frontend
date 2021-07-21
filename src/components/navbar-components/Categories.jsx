import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Categories = ({
  hideCategories,
  showSubcategories,
  setCategoryIndex,
  setCategory,
  type = { id: 'consoles' },
}) => {
  const [allCategories] = useFetch('http://15.188.133.89:8080/categories');
  const history = useHistory();

  const handleClick = (i, c) => {
    setCategoryIndex(i + 1);
    setCategory(c);
    history.push(`/catalogue/${type.id}/${c}`);
    hideCategories();
    showSubcategories();
  };

  return (
    <>
      {!allCategories && <li className="category">cargando...</li>}

      {allCategories
        ?.reduce(
          (acc, c) => (acc.includes(c.categoria) ? acc : [...acc, c.categoria]),
          []
        )
        .map((c, i) => (
          <li className="category " key={i}>
            <div className="category-name" onClick={() => handleClick(i, c)}>
              {c}
            </div>
          </li>
        ))}
    </>
  );
};

export default Categories;
