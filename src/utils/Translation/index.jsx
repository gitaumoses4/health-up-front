import React from 'react';
import PropTypes from 'prop-types';
import strings from './strings';

const lang = process.env.REACT_APP_LANGUAGE || 'en';

const translate = (text) => {
  const languages = {
    en: 0,
    ar: 1,
  };
  let string = strings[text];
  string = string ? string[languages[lang]] : '';

  return string;
};

translate.propTypes = {
  text: PropTypes.string,
  func: PropTypes.string,
};

translate.defaultProps = {
  text: '',
  func: null,
};

const T = Object.keys(strings)
  .reduce((acc, cur) => ({
    ...acc,
    [cur]: translate(cur),
  }), {});

export default T;
