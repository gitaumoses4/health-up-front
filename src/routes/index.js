import {Route, Switch} from 'react-router';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Home from '../views/Home';
import Register from '../views/Register';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';

const routes = {
  '/': Home,
  '/register': Register,
  '/login': Login,
  '/dashboard': Dashboard
};

const App = () => (
  <BrowserRouter>
    <Switch>
      {
        Object.keys(routes).map(route => (
          <Route path={route} key={route} exact component={routes[route]} />
        ))
      }
    </Switch>
  </BrowserRouter>
);

export default App;
