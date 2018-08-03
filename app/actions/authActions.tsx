import { Dispatch } from 'redux';
import { push } from 'react-router-redux';
import * as authService from '../services/authService';

import { AUTH } from './actionTypes';

export function loginRequest() {
  return {
    type: AUTH.LOGIN_BEGIN
  };
}

export function loginSuccess(user: any) {
  return {
    type: AUTH.LOGIN_SUCCESS,
    user
  };
}

export function loginFailed(error: any) {
  return {
    type: AUTH.LOGIN_FAILED,
    message: error
  };
}

export function login(payload: any) {
  return function (dispatch: Dispatch<any>) {
    dispatch(loginRequest());
    return authService.login(payload)
      .then(
        response => {
          dispatch(loginSuccess(response));
          dispatch(push('/'));
        },
        error => dispatch(loginFailed(error))
      );
  };
}
