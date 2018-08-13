import * as React from 'react';
import FormInput from 'rootApp/components/Common/Form/FormInput';
import { Alert } from 'reactstrap';
import { Error } from 'rootApp/models';

import './LoginForm.scss';

interface LoginFormProps {
  error: Error;
  onSubmit: ((username: string, password: string) => void);
}

interface LoginFormState {
  username?: string;
  password?: string;
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

  state = {
    username: '',
    password: ''
  };

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onSubmit(this.state.username, this.state.password);
  }

  renderError = () => {
    const { error } = this.props;
    let dataToRender = null;

    if (error) {
      dataToRender = (<Alert color="danger">{error.message}</Alert>);
    }

    return dataToRender;
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.handleOnSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <FormInput
          inputId="inputEmail"
          label="Username or email address"
          type="text"
          onChange={this.handleOnChange}
          name="username"
          placeholder="Username or email address"
          value={this.state.username} />
        <FormInput
          inputId="inputPassword"
          label="Password"
          onChange={this.handleOnChange}
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password} />
        <span>Hint: <i>username/password</i></span>
        {this.renderError()}
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    );
  }
}

export default LoginForm;
