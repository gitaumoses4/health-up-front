import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from '../../../../utils/Forms/Input';
import T from '../../../../utils/Translation';
import Button from '../../../Button';

const NormalUser = ({ valid }) => (
  <React.Fragment>
    <Input name="name" placeholder={T.name} rules={['required']} />
    <Input name="email" rules={['required', 'email']} placeholder={T.email} />
    <Input name="password" type="password" placeholder={T.password} />
    <Button type="submit" disabled={!valid}>{T.sign_up}</Button>
  </React.Fragment>
);

NormalUser.propTypes = {

};

export default NormalUser;
