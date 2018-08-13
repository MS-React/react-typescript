import initialState from 'rootApp/reducers/initialState';

describe('initialState', () => {

  it('should return the initial state', () => {
    expect(initialState).toEqual({
      auth: {
        authenticating: false,
        isAuthenticated: false,
        error: null,
        user: null
      },
      users: {
        data: [],
        selectedUser: {},
        fetch: {
          error: null,
          loading: false
        }
      },
      routing: null
    });
  })
});