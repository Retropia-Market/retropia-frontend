import { Route, Switch } from 'react-router-dom';

import ProductList from './components/ProductList';
import Product from './components/ProductsComponents/Product';
import SearchList from './components/ProductsComponents/SearchList';
import TopProducts from './components/ProductsComponents/TopProducts';
import Navbar from './components/Navbar';
import MainBackground from './components/MainBackground';

import NewSale from './components/ProductsComponents/NewSaleComponents/NewSale';
import Profile from './components/profile-components/Profile';

import './styles/App.scss';
import UserPublicProfile from './components/UserPublicProfile/UserPublicProfile';

function App() {
    return (
        <div className="App">
            <Navbar />
            <main className="main">
                <Switch>
                    <Route path="/catalogue/videogames" exact>
                        <ProductList type={'videogame'} />
                    </Route>
                    <Route
                        path="/catalogue/videogames/:category/:subcategory?"
                        exact
                    >
                        <ProductList type={'videogame'} />
                    </Route>
                    <Route path="/catalogue/consoles" exact>
                        <ProductList type={'console'} />
                    </Route>
                    <Route
                        path="/catalogue/consoles/:category/:subcategory?"
                        exact
                    >
                        <ProductList type={'console'} />
                    </Route>
                    <Route path="/catalogue/accesories" exact>
                        <ProductList type={'accesory'} />
                    </Route>
                    <Route
                        path="/catalogue/accesories/:category/:subcategory?"
                        exact
                    >
                        <ProductList type={'accesory'} />
                    </Route>
                    <Route path="/catalogue/:id" exact>
                        <Product />
                    </Route>
                    <Route path="/search/:q?" exact>
                        <SearchList />
                    </Route>
                    <Route path="/sell" exact>
                        <NewSale />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/users/:uid">
                        <UserPublicProfile />
                    </Route>
                    <Route path="/" exact>
                        <MainBackground />
                        <TopProducts />
                    </Route>
                    <Route path="/">Not Found</Route>
                </Switch>
            </main>
        </div>
    );
}

export default App;
