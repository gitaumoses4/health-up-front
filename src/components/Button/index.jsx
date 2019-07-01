import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Button.scss';
import classNames from 'classnames';

const Button = ({ children, secondary, link }) => {
  return (
    <button
      type="button" className={classNames({
        secondary: secondary,
        button: true
      })}>
      {
        link ? (
          <Link to={link}>{children}</Link>
        ): children
      }
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  secondary: PropTypes.bool,
  link: PropTypes.string
};

Button.defaultProps = {
  secondary: false,
  link: undefined
};

export default Button;
