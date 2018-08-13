import * as React from 'react';
import * as actions from '../../actions/authActions';
import LoginPage from '../Pages/Login';
import HomePage from '../Pages/Home';
import NotFoundPage from '../Pages/NotFound';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { StoreState } from 'rootApp/models';

interface MainProps {
  actions: any;
  isAuthenticated: boolean;
  usersActions: any;
}

export class Main extends React.Component<MainProps, {}> {
  static defaultProps = {
    isAuthenticated: false
  };

  render() {
    return (
      <main className="app-container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
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
