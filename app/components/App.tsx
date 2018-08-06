import * as React from 'react';
import AppProps from './AppProps';
import Main from './Main';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

export default class App extends React.Component<AppProps, {}> {

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
