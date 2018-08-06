import * as React from 'react';
import * as actions from '../actions/authActions';
import MainProps from './MainProps';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/not_found/NotFoundPage';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { StoreState } from '../models'

export class Main extends React.Component<MainProps, {}> {

  static defaultProps = {
    isAuthenticated: false
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export function mapStateToProps(state: StoreState) {
  return { isAuthenticated: state.auth.isAuthenticated };
}

export function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

/**
 * Issue with router, we need to check this to avoid any
 * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/18999
 */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main) as any);
