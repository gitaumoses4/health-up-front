import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from '../../utils/Forms';
import Input from '../../utils/Forms/Input';

class SignUpForm extends Component {

  render() {
    return (
      <Form state={this.state}>
        <Input
          name="name"
          placeholder="Enter name"
          rules={['required']}
          messages={{
            required: 'Please enter your name'
          }}
        />
        <Input name="email" placeholder="Enter email" />
        <Input name="password" placeholder="Enter your password" />
      </Form>
    );
  }
}

SignUpForm.propTypes = {

};

export default SignUpForm;
