import { Route, Switch } from 'react-router-dom';
import Catalogue from './components/ProductsComponents/Catalogue';
import Product from './components/ProductsComponents/Product';
import SearchList from './components/ProductsComponents/SearchList';
import TopProducts from './components/ProductsComponents/TopProducts';
import './styles/App.css';

function App() {
    return (
        <div className="App">
            <main>
                <Switch>
                    <Route path="/catalogue" exact>
                        <Catalogue />
                    </Route>
                    <Route path="/" exact>
                        <TopProducts />
                    </Route>
                    <Route path="/search/:q?" exact>
                        <SearchList />
                    </Route>
                    <Route path="/catalogue/:id" exact>
                        <Product />
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default App;
