import { Route, Switch } from 'react-router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthenticationWrapper from '../components/AuthenticationWrapper';
import connectResource from '../utils/ResourceComponent';
import API from '../utils/api';
import routes from './routes';
import { UNAUTHENTICATED } from '../utils/accountTypes';

const checkPermission = (history, allowedRoles, user) => {
  if (allowedRoles.includes(UNAUTHENTICATED)) {
    if (user) {
      history.push('/dashboard');
    } else {
      return true;
    }
  } else {
    const hasPermission = user && allowedRoles.includes(user.accountType);
    if (!hasPermission && allowedRoles.length) {
      history.push('/');
      return false;
    }
    return true;
  }
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
      const { user: { data: { loading, user } }, history } = this.props;

      return !loading && checkPermission(history, roles, user) ? (
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
