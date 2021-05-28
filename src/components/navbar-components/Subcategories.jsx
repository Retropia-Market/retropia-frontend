import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'

const Subcategories = ({typeIndex, categoryIndex, goBack}) => {


  return <> 
    <FontAwesomeIcon icon={faChevronLeft} onClick={goBack}></FontAwesomeIcon>
      {typeIndex === 0 && {
        categoryIndex
      }}
  </>
}

export default Subcategories