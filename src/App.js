import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          Home
        </Route>
      </Switch>
    </div>
  );
}

export default App;
