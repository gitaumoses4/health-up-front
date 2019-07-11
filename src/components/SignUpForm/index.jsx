import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form, { FormContext } from '../../utils/Forms';
import Input from '../../utils/Forms/Input';
import Button from '../Button';
import Translation from '../../utils/Translation';
import './SignUpForm.scss';

class SignUpForm extends Component {
  rules = {
    required: {
      message: Translation.not_empty,
    },
    email: {
      message: Translation.valid_email
    }
  };

  render() {
    return (
      <Form state={this.state} className="signup-form" rules={this.rules}>
        <FormContext.Consumer>
          {({ valid }) => {
            return (
              <React.Fragment>
                <Input
                  name="name"
                  placeholder={Translation.name}
                  rules={['required']}
                />
                <Input
                  name="email"
                  rules={['required', 'email']}
                  placeholder={Translation.email}
                />
                <Input
                  name="password"
                  placeholder={Translation.password} />
                <Button disabled={!valid}>
                  {Translation.sign_up}
                </Button>
              </React.Fragment>
            );
          }}
        </FormContext.Consumer>
      </Form>
    );
  }
}

SignUpForm.propTypes = {

};

export default SignUpForm;
