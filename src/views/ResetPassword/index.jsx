import React from 'react';
import PropTypes from 'prop-types';
import T from '../../utils/Translation';
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm';
import Layout from '../../Layout';

const ResetPassword = ({ history, match: { params: { token } } }) => (
  <Layout
    header={T.reset_password}
    history={history}>
    <div className="forgot-password">
      <ResetPasswordForm token={token} history={history} />
    </div>
  </Layout>
);

ResetPassword.propTypes = {

};

export default ResetPassword;
