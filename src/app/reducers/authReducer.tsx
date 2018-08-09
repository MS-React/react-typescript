import { Auth } from 'rootApp/models/auth';
import { AUTH as actionTypes } from '../actions/actionTypes';

export const createAuthInstance = () : Auth => ({
  authenticating: false,
  isAuthenticated: false,
  error: null,
  user: null
});

export default function authReducer(state = createAuthInstance(), action: any) {
  switch (action.type) {
    case actionTypes.LOGIN_BEGIN:
      return {
        ...state,
        authenticating: true
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      };

    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
}
