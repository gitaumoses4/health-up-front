import React, { Component } from 'react';
import toast from 'toastr';
import connectResource from '../../utils/ResourceComponent';

class AuthenticationWrapper extends Component {
  componentDidMount() {
    const { readResource } = this.props;
    readResource({
      errorCallback: (error) => {
        if (window.location.pathname !== '/' && error.status === 401) {
          toast.error('Session expired. Login to continue');
          localStorage.clear();
          window.location.replace('/');
        }
      },
    });
  }

  render() {
    const { loading, children } = this.props;
    return (
      <div className="layout-shell">
        <div className="layout-shell__content">
          {
            !loading && (
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
