import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Subcategories = ({
  categoryIndex,
  hideSubcategories,
  showCategories,
  type = { id: 'consoles' },
  category,
}) => {
  const [allCategories] = useFetch(
    'https://api.retropia-market.com/categories'
  );
  const history = useHistory();

  const handleClick = () => {
    hideSubcategories();
    showCategories();
  };

  const handleClickSubcategories = (c) => {
    history.push(`/catalogue/${type.id}/${category}/${c.name}`);
  };

  return (
    <>
      <FontAwesomeIcon
        className="category-select"
        icon={faChevronLeft}
        onClick={handleClick}
      ></FontAwesomeIcon>
      {!allCategories && <li>cargando...</li>}
      {allCategories
        ?.filter((c) => c.category_id === categoryIndex)
        .map((c) => (
          <li className="category subcategory" key={c.id}>
            <div
              className="category-name"
              onClick={(e) => handleClickSubcategories(c)}
            >
              {c.name}
            </div>
          </li>
        ))}
    </>
  );
};

export default Subcategories;
