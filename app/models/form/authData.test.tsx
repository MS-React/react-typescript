import { AuthData } from './authData';

describe('AuthData interface', () => {
  
  it('should create interface', () => {
    const state: AuthData = {
      username: 'username', 
      password: 'password' 
    };

    expect(state).toEqual({
      username: 'username',
      password: 'password'
    });
  });
});