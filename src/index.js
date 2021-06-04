import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import es from './locale/es.json';

import { Provider } from 'react-redux';
import store from './reducer';

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <IntlProvider messages={es} locale="es" defaultLocale="es">
                    <App />
                </IntlProvider>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
