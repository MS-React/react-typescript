import authReducer, { createAuthInstance } from './authReducer';
import { AUTH as actionTypes } from '../actions/actionTypes';

describe('authReducer', () => {
  it('should return the initial state', () => {
    const result = authReducer(createAuthInstance(), {});

    expect(result).toEqual({
      authenticating: false,
      error: null,
      isAuthenticated: false,
      user: null
    });
  });

  it('should handle a login request', () => {
    const result = authReducer(createAuthInstance(), {
      type: actionTypes.LOGIN_BEGIN
    });

    expect(result).toEqual({
      authenticating: true,
      error: null,
      isAuthenticated: false,
      user: null
    });
  });

  it('should handle a successfully login', () => {
    const result = authReducer(createAuthInstance(), {
      type: actionTypes.LOGIN_SUCCESS,
      user: {
        name: 'John'
      }
    });

    expect(result).toEqual({
      authenticating: false,
      error: null,
      isAuthenticated: true,
      user: {
        name: 'John'
      }
    });
  });

  it('should handle a failed login', () => {
    const result = authReducer(createAuthInstance(), {
      type: actionTypes.LOGIN_FAILED,
      error: {
        code: 400,
        message: 'Unexpected error.'
      }
    });

    expect(result).toEqual({
      authenticating: false,
      error: {
        code: 400,
        message: 'Unexpected error.'
      },
      isAuthenticated: false,
      user: null
    });
  });
});
