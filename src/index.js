import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './reducer';
import LanguageSwitcher from './components/intlComponents/LanguageSwitcher';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <LanguageSwitcher>
                    <App />
                </LanguageSwitcher>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
