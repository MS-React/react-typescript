import * as React from 'react';
import * as actions from '../../actions/authActions';
import MainProps from './props';
import LoginPage from '../Pages/Login';
import DashboardPage from '../Pages/Dashboard';
import NotFoundPage from '../Pages/NotFound';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { StoreState } from 'rootApp/models';

export class Main extends React.Component<MainProps, {}> {
  static defaultProps = {
    isAuthenticated: false
  };

  render() {
    return (
      <main className="app-container">
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>
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
