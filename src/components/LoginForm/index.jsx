import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form, { FormContext } from '../../utils/Forms';
import Input from '../../utils/Forms/Input';
import T from '../../utils/Translation';
import Button from '../Button';
import './LoginForm.scss';

class LoginForm extends Component {
  rules = {
    required: {
      message: T.not_empty
    },
  };

  render() {
    return (
      <Form state={this.state} className="login-form" rules={this.rules}>
        <FormContext.Consumer>
          {({ valid }) => (
            <React.Fragment>
              <Input
                name="email"
                placeholder={T.email}
                rules={['email']}
                messages={{
                  email: T.valid_email
                }}
              />
              <Input
                name="password"
                type="password"
                placeholder={T.password}
              />
              <Button disabled={!valid}>
                {T.sign_in}
              </Button>
            </React.Fragment>
          )}
        </FormContext.Consumer>
      </Form>
    );
  }
}

LoginForm.propTypes = {};

LoginForm.defaultProps = {};

export default LoginForm;
