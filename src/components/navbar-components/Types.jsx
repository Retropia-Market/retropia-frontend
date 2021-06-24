import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Types = ({ typeIndex, setTypeIndex, setType }) => {
  const { pathname } = useLocation();

  const types = [
    { id: 'consoles', name: 'consolas' },
    { id: 'videogames', name: 'videojuegos' },
    { id: 'accesories', name: 'perifericos' },
  ];

  const handleClick = (i) => {
    setTypeIndex(i);
    setType(types[i]);
  };

  return types.map((t, i) => (
    <div
      key={i}
      onClick={() => handleClick(i)}
      className={`type ${
        typeIndex === i && pathname.includes(`/catalogue/${t.id}`)
          ? 'selected'
          : ''
      } `}
    >
      <Link className="type-name " to={'/catalogue/' + t.id} key={i}>
        {t.name === 'consolas' ? (
          <FormattedMessage id="navbar.consoles" />
        ) : t.name === 'videojuegos' ? (
          <FormattedMessage id="navbar.videogames" />
        ) : (
          <FormattedMessage id="navbar.accesories" />
        )}
      </Link>
    </div>
  ));
};

export default Types;
