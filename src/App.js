import { Route, Switch } from 'react-router-dom';
import Catalogue from './components/ProductsComponents/Catalogue';
import './styles/App.css';

function App() {
    return (
        <div className="App">
            <main>
                <Switch>
                    <Route path="/catalogue" exact>
                        <Catalogue />
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default App;
