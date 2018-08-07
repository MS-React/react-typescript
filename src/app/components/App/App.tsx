import * as React from 'react';
import AppProps from './props';
import Main from '../Main';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

const App = (props: AppProps) => (
  <Provider store={props.store}>
    <ConnectedRouter history={props.history}>
      <Main />
    </ConnectedRouter>
  </Provider>
);

export default App;
