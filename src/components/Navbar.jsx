import { useState } from "react"
import { Link, useHistory } from "react-router-dom"

import logo from '../img/logo.svg';
import '../styles/Navbar.css';

function Categories({categories, setIndex}){
  const hoverHandler = i => {
    setIndex(i)
  }
  return( 
    <div className="categories">
      {categories.map((c, i) => <Link to={'/catalogue/' + c} Link key={i} onMouseEnter={() => hoverHandler(i)}>{c}</Link>)}
    </div>
  )
}

function Subcategories({index}){
  return <>
    {index === 0 && <>
      subcategorias consolas
    </>}
    {index === 1 && <>
      subcategorias videojuegos
    </> }
    {index === 2 && <>
      subcategorias perifericos
    </> }
  </>
}

const Navbar = () => {
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState('')
  const history = useHistory()
  const categories = ['consolas', 'videojuegos', 'perifericos']

  const submitHandler = (e) => {
    e.preventDefault()
    history.push('catalogue/' + search)
  }

  return (
    <div className="navbar-container">
      <div className="logo">
        <img src={logo} alt="Logo Retropia Market" />
      </div>
      <nav className="right-navbar">
        <div className="upper">
          <div className="search">
            <form className="search-bar" onChange={e=> setSearch(e.target.value)}>
              <input type="text" placeholder="Ingresa tu búsqueda..." />
              <button>🔍</button>
            </form>
            <Categories categories={categories} setIndex={setIndex} onSubmit={submitHandler}/>
          </div>
          <div className="user-nav">
            <Link className="sell-button">VENDER +</Link>
            <div className="messages">ICON</div>
            <div className="notifications">ICON</div>
            <div className="user">
              <div className="user-pic">FOTO</div>
              <div className="user-settings">ICON</div>
            </div>
          </div>
        </div>
        <div className="lower">
          <Subcategories index={index} />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
