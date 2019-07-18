import React from 'react';
import ReactDOM from 'react-dom';
import 'toastr/build/toastr.css';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import App from './routes';
import './index.scss';

const language = localStorage.getItem('lang') || process.env.REACT_APP_LANGUAGE;


const setLanguage = (lang = language) => {
  const html = document.querySelector('html');
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  html.setAttribute('lang', lang);
};

setLanguage(language);


if (process.env.NODE_ENV === 'development') {
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.which === 76) {
      const current = document.querySelector('html').getAttribute('lang');
      localStorage.setItem('lang', current === 'ar' ? 'en' : 'ar');
      window.location.reload();
    }
  });
}

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

export default routes;
