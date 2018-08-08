import * as React from 'react';
import Main from '../Main';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

interface AppProps {
  store: any;
  history: any;
};


const App = (props: AppProps) => (
  <Provider store={props.store}>
    <ConnectedRouter history={props.history}>
      <Main />
    </ConnectedRouter>
  </Provider>
);

export default App;
