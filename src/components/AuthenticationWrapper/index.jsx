import React, { Component } from 'react';
import toast from 'toastr';
import Loader from 'react-loader-spinner';
import connectResource from '../../utils/ResourceComponent';

class AuthenticationWrapper extends Component {
  componentWillMount() {
    const { readResource } = this.props;
    readResource();
  }

  render() {
    const { loading, children } = this.props;
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
