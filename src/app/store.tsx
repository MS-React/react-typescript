import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware
    )
  )
);
