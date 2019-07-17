import React, { Component } from 'react';
import toast from 'toastr';
import connectResource from '../../utils/ResourceComponent';

class AuthenticationWrapper extends Component {
  componentWillMount() {
    const { readResource } = this.props;
    readResource();
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
