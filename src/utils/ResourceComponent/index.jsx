import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resourceRequest } from '../../redux/resources/resourceActions';


const connectResource = Component => ({
  resources = [],
  setToProps = false,
  types = ['create', 'read', 'update', 'delete'],
}) => {
  const mapStateToProps = state => resources.reduce(
    (acc, cur) => (!(resources.length === 1 && setToProps) ? {
      ...acc,
      [cur]: state.resources[cur],
    } : {
      ...state.resources[cur],
    }), {},
  );

  const mapDispatchToProps = dispatch => types.reduce((acc, type) => {
    const createResource = !(resources.length === 1 && setToProps)
      ? name => data => dispatch(resourceRequest(name, type)(data))
      : data => dispatch(resourceRequest(resources[0], type)(data));
    return {
      ...acc,
      [`${type}Resource`]: createResource,
    };
  }, {});

  return connect(mapStateToProps, mapDispatchToProps)(Component);
};

export default connectResource;
