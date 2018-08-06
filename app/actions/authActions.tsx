import { AuthData, User } from '../models';
import { Dispatch } from 'redux';
import { push } from 'react-router-redux';
import * as authService from '../services/authService';

import { AUTH as actionTypes } from './actionTypes';

export function loginRequest() {
  return {
    type: actionTypes.LOGIN_BEGIN
  };
}

export function loginSuccess(user: User) {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user
  };
}

export function loginFailed(error: string) {
  return {
    type: actionTypes.LOGIN_FAILED,
    message: error
  };
}

export function login(payload: AuthData) {
  return function (dispatch: Dispatch<any>) {
    dispatch(loginRequest());
    return authService.login(payload)
      .then(
        (response: User) => {
          dispatch(loginSuccess(response));
          dispatch(push('/'));
        },
        (error: string) => dispatch(loginFailed(error))
      );
  };
}
