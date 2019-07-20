import { Route, Switch } from 'react-router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthenticationWrapper from '../components/AuthenticationWrapper';
import connectResource from '../utils/ResourceComponent';
import API from '../utils/api';
import routes from './routes';
import { UNAUTHENTICATED } from '../utils/accountTypes';
import Home from '../views/Home';

const checkPermission = (history, allowedRoles, user) => {
  if (user) {
    if (allowedRoles.includes(UNAUTHENTICATED) || !allowedRoles.includes(user.accountType)) {
      history.push('/dashboard');
    } else {
      return true;
    }
  }
  return allowedRoles.includes(UNAUTHENTICATED);
};

const AuthenticatedRoute = (ComposedComponent, roles = []) => {
  class AuthRoute extends React.Component {
    componentDidMount() {
      const token = localStorage.getItem('jwt-token');

      if (token) {
        API.setToken();
      }
    }

    render() {
      const { user: { data: { user } }, history } = this.props;

      return checkPermission(history, roles, user) ? (
        <ComposedComponent {...this.props} />
      ) : null;
    }
  }

  return connectResource(AuthRoute)({
    resources: ['user'],
    setToProps: false,
  });
};

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <AuthenticationWrapper>
        {
          Object.keys(routes).map((route) => {
            const [component, auth = []] = routes[route];
            return (
              <Route
                path={route}
                key={route}
                exact
                component={AuthenticatedRoute(component, auth)}
              />
            );
          })
        }
      </AuthenticationWrapper>
    </Switch>
  </BrowserRouter>
);

export default App;
