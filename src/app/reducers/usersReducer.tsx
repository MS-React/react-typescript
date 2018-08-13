import { Users } from 'rootApp/models/users';
import { USERS as actionTypes } from 'rootApp/actions/actionTypes';
import { getUserId } from 'rootApp/utils/user';

export const createUsersInstance = () : Users => ({
  data: [],
  selectedUser: {},
  fetch: {
    loading: false,
    error: null
  }
});

export default function usersReducer(state = createUsersInstance(), action: any) {
  switch (action.type) {
    case actionTypes.CREATE_SUCCESS:
      return {
        ...state,
        data: [
          action.payload,
          ...state.data
        ]
      };

    case actionTypes.DELETE_SUCCESS:
      return {
        ...state,
        data: state.data.filter(user => getUserId(action.payload) !== getUserId(user))
      };

    case actionTypes.GET_ALL_SUCCESS:
      return {
        ...state,
        data: action.payload.users
      };

    case actionTypes.SELECT_SUCCESS:
      return {
        ...state,
        selectedUser: action.payload
      };

    case actionTypes.UPDATE_SUCCESS:
      return {
        ...state,
        data: [
          action.payload,
          ...state.data.filter(user => getUserId(action.payload) !== getUserId(user))
        ]
      };

    case actionTypes.LOADING_BEGIN:
      return {
        ...state,
        fetch: {
          loading: true,
          error: null
        }
      };

    case actionTypes.LOADING_COMPLETE:
      return {
        ...state,
        fetch: {
          loading: false,
          error: null
        }
      };

    case actionTypes.LOADING_FAILED:
      return {
        ...state,
        fetch: {
          loading: false,
          error: action.payload.error
        }
      };

    default:
      return state;
  }
}
