import React from 'react';
import PropTypes from 'prop-types';
import Main from './Main';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { AppInterface } from './AppInterface';

export default class App extends React.Component<AppInterface, {}> {

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Main />
        </ConnectedRouter>
      </Provider>
    );
  }
}
