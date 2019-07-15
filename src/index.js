import React from 'react';
import ReactDOM from 'react-dom';
import 'toastr/build/toastr.css';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import App from './routes';
import './index.scss';

const language = process.env.REACT_APP_LANGUAGE;
document.querySelector('html').setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');

const routes = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(routes(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
