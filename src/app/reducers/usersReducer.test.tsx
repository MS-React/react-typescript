import usersReducer, { createUsersInstance } from 'rootApp/reducers/usersReducer';
import { USERS as actionTypes } from 'rootApp/actions/actionTypes';
import { User, Fetch } from 'rootApp/models';

describe('usersReducer', () => {
  const initialState = createUsersInstance();

  it('should be defined', () => {
    expect(usersReducer).toBeDefined();
  });

  it('should be a function', () => {
    expect(usersReducer).toEqual(expect.any(Function));
  });

  it('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual(createUsersInstance());
  });

  it('should set loading users to `true` ', () => {
    const action = {
      type: actionTypes.LOADING_BEGIN
    };
    const expectedState = {
      ...initialState,
      fetch: {
        loading: true,
        error: null
      } as Fetch
    };

    expect(usersReducer(initialState, action)).toEqual(expectedState);
  });

  it('should set loading users to `false`', () => {
    const action = {
      type: actionTypes.LOADING_COMPLETE
    };
    const expected = {
      ...initialState,
      fetch: {
        loading: false,
        error: null
      } as Fetch
    };

    expect(usersReducer(initialState, action)).toEqual(expected);
  });

  it('should set loading users to `false` and set the error', () => {
    const action = {
      type: actionTypes.LOADING_FAILED,
      payload: {
        error: 'foo'
      }
    };
    const expected = {
      ...initialState,
      fetch: {
        loading: false,
        error: 'foo'
      } as Fetch
    };

    expect(usersReducer(initialState, action)).toEqual(expected);
  });

  it('should load the fetched users into the store', () => {
    const action = {
      type: actionTypes.GET_ALL_SUCCESS,
      payload: {
        users: [{
          name: 'John Doe'
        }]
      }
    };
    const expected = {
      ...initialState,
      data: [{
        name: 'John Doe'
      }]
    };

    expect(usersReducer(initialState, action)).toEqual(expected);
  });

  it('should set the selected user in the store', () => {
    const action = {
      type: actionTypes.SELECT_SUCCESS,
      payload: {
        name: 'John Doe'
      }
    };
    const expected = {
      ...initialState,
      selectedUser: {
        name: 'John Doe'
      }
    };

    expect(usersReducer(initialState, action)).toEqual(expected);
  });

  it('should delete the given user from the store', () => {
    const action = {
      type: actionTypes.DELETE_SUCCESS,
      payload: {
        _id: 'fake.id.joe',
        name: 'John Doe' 
      }
    };
    const expectedState = {
      ...initialState,
      data: [{
        _id: 'fake.id.jane',
        name: 'Jane Doe' 
      }],
    };

    const state = usersReducer(
      {
        ...initialState,
        data: [
          {
            _id: 'fake.id.joe',
            name: 'John Doe' 
          },
          {
            _id: 'fake.id.jane',
            name: 'Jane Doe' 
          }
        ] as User[],
      },
      action
    );
    
    expect(state).toEqual(expectedState);
  });

  it('should add the created user into the store', () => {
    const action = {
      type: actionTypes.CREATE_SUCCESS,
      payload: {
        name: 'John Doe' 
      }
    };
    const expectedState = {
      ...initialState,
      data: [
        {
          name: 'John Doe' 
        },
        {
          name: 'Jane Doe' 
        }
      ]
    };

    const state = usersReducer(
      {
        ...initialState,
        data: [
          {
            name: 'Jane Doe' 
          }
        ] as User[],
      },
      action
    );

    expect(state).toEqual(expectedState);
  });

  it('should update the modified user in the store', () => {
    const action = {
      type: actionTypes.UPDATE_SUCCESS,
      payload: {
        _id: 'fake.id.john',
        name: 'John Doe Jr.'
      }
    };
    const expectedState = {
      ...initialState,
      data: [
        {
          _id: 'fake.id.john',
          name: 'John Doe Jr.' 
        },
        {
          _id: 'fake.id.jane',
          name: 'Jane Doe' 
        }
      ]
    };

    const state = usersReducer(
      {
        ...initialState,
        data: [
          {
            _id: 'fake.id.john',
            name: 'John Doe' 
          },
          {
            _id: 'fake.id.jane',
            name: 'Jane Doe' 
          }
        ] as User[],
      },
      action
    );

    expect(state).toEqual(expectedState);
  });
});
