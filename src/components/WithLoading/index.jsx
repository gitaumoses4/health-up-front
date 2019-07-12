import React from 'react';
import PropTypes from 'prop-types';
import './WithLoading.scss';
import Loader from 'react-loader-spinner';

const WithLoading = (Component, prop = 'loading', LoadingElement) => {
  class Loading extends React.Component{
    render(){
      const { props } = this;
      const loading = props[prop];
      return (
        <div className={`loading-component ${loading ? 'loading': ''}`}>
          <div className="loading-component__content">
            {
              <Component {...this.props} />
            }
          </div>
          <div className="loader">
            { LoadingElement || (
              <div className="default">
                <Loader type="Oval" color="#666" height={40} width={40} />
              </div>
            )}
          </div>
        </div>
      );
    }
  }

  return Loading;
};

WithLoading.propTypes = {};

WithLoading.defaultProps = {};

export default WithLoading;
