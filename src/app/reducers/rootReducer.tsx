import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './authReducer';

const rootReducer = combineReducers({
  auth,
  routing
});

export default rootReducer;
