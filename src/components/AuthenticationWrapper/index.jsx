import React, { Component } from 'react';
import toast from 'toastr';
import Loader from 'react-loader-spinner';
import connectResource from '../../utils/ResourceComponent';

const allowedRoutes = [/login/, /register/, /login\/ambulance/];

class AuthenticationWrapper extends Component {
  componentWillMount() {
    const { readResource, location, history } = this.props;
    readResource({
      errorCallback: () => {
        if (!allowedRoutes.find(route => route.test(location.pathname))) {
          window.location.href = '/login';
        }
      },
    });
  }

  render() {
    const { fetched, children } = this.props;
    const loading = !fetched;
    return (
      <div className={`layout-shell ${loading ? 'loading' : ''}`}>
        <div className="layout-shell__content">
          {
            (loading) ? (
              <div className="main-loader">
                <Loader type="Triangle" color="#000" height={60} width={60} />
              </div>
            ) : (
              children
            )
          }
        </div>
      </div>
    );
  }
}

export default connectResource(AuthenticationWrapper)({
  resources: ['user'],
  setToProps: true,
});
