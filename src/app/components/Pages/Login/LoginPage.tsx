import * as React from 'react';
import LoginForm from './Form/LoginForm';
import * as authActions from 'rootApp/actions/authActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StoreState, Auth } from 'rootApp/models';

import './LoginPage.scss';

interface LoginPageProps {
  auth: Auth;
  actions: any;
}

export class LoginPage extends React.Component<LoginPageProps, {}> {

  handleOnSubmit = (username: string, password: string) => {
    this.props.actions.login({
      username,
      password
    });
  }

  render() {
    return (
      <section className="login-page">
        <div className="login-page--form">
          <LoginForm 
            error={this.props.auth.error} 
            onSubmit={this.handleOnSubmit} />
        </div>
      </section>
    );
  }
}

export function mapStateToProps(state: StoreState) {
  return { auth: state.auth };
}

export function mapDispatchToProps(dispatch: any) {
  return { actions: bindActionCreators(authActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
