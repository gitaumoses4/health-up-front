import React from 'react';
import PropTypes from 'prop-types';
import strings from './strings';

const lang = process.env.REACT_APP_LANGUAGE || 'en';

export const Translation = (text) => {
  const languages = {
    en: 0,
    ar: 1
  };
  let string = strings[text];
  string = string ? string[languages[lang]] : '';

  return string;
};

Translation.propTypes = {
  text: PropTypes.string,
  func: PropTypes.string
};

Translation.defaultProps = {
  text: '',
  func: null
};

export default Object.keys(strings)
  .reduce((acc, cur) => {
    return {
      ...acc,
      [cur]: Translation(cur)
    };
  }, {});

