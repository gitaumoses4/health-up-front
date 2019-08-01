import { Route, Switch } from 'react-router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthenticationWrapper from '../components/AuthenticationWrapper';
import connectResource from '../utils/ResourceComponent';
import API from '../utils/api';
import routes from './routes';
import { UNAUTHENTICATED } from '../utils/accountTypes';
import Home from '../views/Home';
import Login from '../views/Login';
import NotFound from '../components/NotFound';
import ForgotPassword from '../views/ForgotPassword';
import ResetPassword from '../views/ResetPassword';

const hasPermissions = (history, allowedRoles, user) => {
  if (user) {
    if (allowedRoles.includes(UNAUTHENTICATED)) {
      return false;
    }
    return !!allowedRoles.includes(user.accountType);
  }
  if (allowedRoles.includes(UNAUTHENTICATED)) {
    return true;
  }
  history.push('/login');
};

const AuthenticatedRoute = (ComposedComponent, roles = []) => {
  class AuthRoute extends React.Component {
    componentWillMount() {
      const token = localStorage.getItem('jwt-token');
      const { user: { data: { user } }, history } = this.props;
      if (!hasPermissions(history, roles, user)) {
        history.push('/dashboard');
      }
      if (token) {
        API.setToken();
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
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
      <Route path="/forgotPassword" exact component={ForgotPassword} />
      <Route path="/resetPassword/:token" exact component={ResetPassword} />
      <AuthenticationWrapper>
        <Switch>
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
          <Route component={NotFound} />
        </Switch>
      </AuthenticationWrapper>
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
