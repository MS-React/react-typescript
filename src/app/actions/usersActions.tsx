import { apiService } from 'rootApp/api/ApiService';
import { omit } from 'rootApp/utils/functions';
import { USERS as actionTypes } from 'rootApp/actions/actionTypes';
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

export function deleteUser(data: any) {
  return (dispatch: any) => {
    dispatch(loadingUsersBegin());

    return apiService.delete({
      entity: 'users',
      id: getUserId(data)
    }).then((response : any) => {
      dispatch(loadingUsersComplete());
      dispatch(deleteUsersSuccess(data));

      return data;
    }).catch((error: any) => handleErrors(error, dispatch));
  };
}

export function updateUser(data: any) {
  return (dispatch: any) => {
    dispatch(loadingUsersBegin());

    return apiService.update({
      entity: 'users',
      id: getUserId(data),
      data: omit(data, DEFAULT_USER_VALID_ID_PATHS),
    }).then((response : any) => {
      dispatch(loadingUsersComplete());
      dispatch(updateUsersSuccess(response));

      return response;
    });
  };
}

export function createUser(data: any) {
  return (dispatch: any) => {
    dispatch(loadingUsersBegin());

    return apiService.create({
      entity: 'users',
      data
    }).then((response : any) => {
      dispatch(loadingUsersComplete());
      dispatch(createUsersSuccess(response));
    
      return data;
    }).catch((error: any) => handleErrors(error, dispatch));
  };
}

export function getUsers(queryParams = DEFAULT_PAGINATION_QUERY) {
  return (dispatch: any) => {
    dispatch(loadingUsersBegin());

    return apiService.getAll({
      entity: 'users',
      params: {
        page: 1,
        limit: 100
      }
    }).then((response : any) => {
      const usersPayload = {
        ...omit(response, ['docs']),
        users: response.docs
      };

      dispatch(loadingUsersComplete());
      dispatch(getUsersSuccess(usersPayload));
      
      return usersPayload;
    }).catch((error: any) => handleErrors(error, dispatch));
  };
}

function handleErrors(error: any, dispatch: any) {
  errorService.logErrors('action failed', 'userActions.js');
  dispatch(loadingUsersFailed(error));
}
