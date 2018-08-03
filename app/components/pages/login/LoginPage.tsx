import * as React from 'react';
import LoginForm from './LoginForm';
import * as authActions from '../../../actions/authActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginPageInterface } from './LoginPageInterface';

import './LoginPage.scss';

export class LoginPage extends React.Component<LoginPageInterface, {}> {

  handleOnSubmit = (username: string, password: string) => {
    this.props.actions.login({username, password});
  }

  render() {
    return (
      <section className="login-page">
        <div className="login-page--form">
          <LoginForm onSubmit={this.handleOnSubmit} />
        </div>
      </section>
    );
  }
}

export function mapStateToProps(state: any) {
  return { ...state.auth };
}

export function mapDispatchToProps(dispatch: any) {
  return { actions: bindActionCreators(authActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
