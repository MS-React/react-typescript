import { omit } from 'rootApp/utils/functions';
import { USERS as actionTypes } from 'rootApp/actions/actionTypes';
import {
  createUsers,
  deleteUsers,
  fetchUsers,
  updateUsers
} from 'rootApp/services/userService';
import {
  DEFAULT_USER_VALID_ID_PATHS,
  DEFAULT_PAGINATION_QUERY
} from 'rootApp/constants/defaults';
import { getUserId } from 'rootApp/utils/user';

export const loadingUsersBegin = () => {
  return ({
    type: actionTypes.LOADING_BEGIN
  });
};

export const loadingUsersComplete = () => ({
  type: actionTypes.LOADING_COMPLETE
});

export const loadingUsersFailed = (error: any) => ({
  type: actionTypes.LOADING_FAILED,
  payload: { error }
});

export const createUsersSuccess = (user: any) => ({
  type: actionTypes.CREATE_SUCCESS,
  payload: user
});

export const selectUsersSuccess = (user: any) => ({
  type: actionTypes.SELECT_SUCCESS,
  payload: user
});

export const getUsersSuccess = (usersData: any) => ({
  type: actionTypes.GET_ALL_SUCCESS,
  payload: { ...usersData }
});

export const updateUsersSuccess = (user: any) => ({
  type: actionTypes.UPDATE_SUCCESS,
  payload: user
});

export const deleteUsersSuccess = (user: any) => ({
  type: actionTypes.DELETE_SUCCESS,
  payload: user
});

export function selectUser(user: any) {
  return (dispatch: any) => {
    return new Promise(resolve => {
      dispatch(selectUsersSuccess(user));
      resolve(user);
    });
  };
}

export function deleteUser(user: any) {
  return (dispatch: any) => {
    dispatch(loadingUsersBegin());
    return deleteUsers(getUserId(user))
      .then(() => {
        dispatch(loadingUsersComplete());
        dispatch(deleteUsersSuccess(user));
        return user;
      })
      .catch((error: any) => handleErrors(error, dispatch));
  };
}

export function updateUser(user: any) {
  return (dispatch: any) => {
    dispatch(loadingUsersBegin());
    return updateUsers(getUserId(user), omit(user, DEFAULT_USER_VALID_ID_PATHS))
      .then(({ data } : any) => {
        dispatch(loadingUsersComplete());
        dispatch(updateUsersSuccess(data));
        return data;
      })
      .catch((error) => handleErrors(error, dispatch));
  };
}

export function createUser(userData: any) {
  return (dispatch: any) => {
    dispatch(loadingUsersBegin());
    return createUsers(omit(userData, DEFAULT_USER_VALID_ID_PATHS))
      .then(({ data } : any) => {
        dispatch(loadingUsersComplete());
        dispatch(createUsersSuccess(data));
        return data;
      })
      .catch((error) => handleErrors(error, dispatch));
  };
}

export function getUsers(queryParams = DEFAULT_PAGINATION_QUERY) {
  return (dispatch: any) => {
    dispatch(loadingUsersBegin());
    return fetchUsers(queryParams)
      .then(({ data } : any) => {
        const usersPayload = {
          ...omit(data, ['docs']),
          users: data.docs
        };
        dispatch(loadingUsersComplete());
        dispatch(getUsersSuccess(usersPayload));
        return usersPayload;
      })
      .catch((error) => handleErrors(error, dispatch));
  };
}

function handleErrors(error: any, dispatch: any) {
  //errorService.logErrors('action failed', 'userActions.js');
  dispatch(loadingUsersFailed(error));
}
