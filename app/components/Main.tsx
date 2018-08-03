import React from 'react';
import * as actions from '../actions/authActions';
import * as usersActions from '../actions/usersActions';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/not_found/NotFoundPage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { MainInterface } from './MainInterface';

export class Main extends React.Component<MainInterface, {}> {

  static defaultProps = {
    isAuthenticated: false
  };

  render() {
    return (
      <div>
        <Switch>
          <Route component={NotFoundPage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return { isAuthenticated: state.auth.isAuthenticated };
}

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    usersActions: bindActionCreators(usersActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
