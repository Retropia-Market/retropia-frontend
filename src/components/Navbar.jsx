import { useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import {useSelector} from "react-redux"

import Login from './Login'

import logo from '../img/logo.svg';
import '../styles/Navbar.css';
import Register from "./Register";

const Categories = ({categories, setIndex}) =>{
  const hoverHandler = i => {
    setIndex(i)
  }
  return( 
    <div className="categories">
      {categories.map((c, i) =>
      <Link to={'/catalogue/' + c.id} key={i} onMouseEnter={() => hoverHandler(i)}>{c.name}</Link>)}
    </div>
  )
}

const Subcategories = ({index}) => {
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

function Navbar () {
  const {q} = useParams();
  const history = useHistory()
  const user = useSelector(s => s.user);
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [index, setIndex] = useState(0)
  const [search, setSearch] = useState(q || '')
  
  const categories = [
    {id: 'consoles', name: 'consolas'},
    {id: 'videogames', name: 'videojuegos'},
    {id: 'accesories', name: 'perifericos'}
  ]

  const submitHandler = (e) => {
    e.preventDefault()
    history.push('/search/' + search)
  }

  return (
    <>
    <div className="navbar-container">
      <div className="logo">
        <img src={logo} alt="Logo Retropia Market" />
      </div>
      <nav className="right-navbar">
        <div className="upper">
          <div className="search">
            <form className="search-bar" onSubmit={submitHandler}>
              <input type="text" placeholder="Ingresa tu búsqueda..." value={search} onChange={e=> setSearch(e.target.value)}/>
              <button>🔍</button>
            </form>
            <Categories categories={categories} setIndex={setIndex}/>
          </div>
          <div className="user-nav">
            {!user ? <>
              <button onClick={() => setShowLogin(true)}>
                Log in
              </button>
              <button onClick={() => setShowRegister(true)}>
                Register
              </button>
            </> :
            <>
            <Link className="sell-button" to="#">VENDER +</Link>
            <div className="messages">ICON</div>
            <div className="notifications">ICON</div>
            <div className="user">
              <div className="user-pic">FOTO</div>
              <div className="user-settings">ICON</div>
            </div>
            </>}
          </div>
        </div>
        <div className="lower">
          <Subcategories index={index} />
        </div>
      </nav>
    </div>
    {showLogin && <Login setShowLogin={setShowLogin} setShowRegister={setShowRegister}/>}
    {showRegister && <Register setShowLogin={setShowLogin} setShowRegister={setShowRegister}/>}
    </>
  );
};

export default Navbar;
