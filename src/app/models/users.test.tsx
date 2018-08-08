import { Users } from './users';

describe('Users interface', () => {
  
  it('should create interface', () => {
    const state: Users = {
      data: [{
        name: 'name',
        email: 'email',
        phone: 'phone',
      }],
      fetch: {
        error: null,
        loading: false
      },
      selectedUser: {}
    };

    expect(state).toEqual({
      data: [{
        name: 'name',
        email: 'email',
        phone: 'phone',
      }],
      fetch: {
        error: null,
        loading: false
      },
      selectedUser: {}
    });
  });
});