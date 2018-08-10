import * as authService from 'rootApp/services/authService';
import { User, Error } from 'rootApp/models';

describe('authService', () => {
  it('should login with the right credentials', () => {
    authService.login({ 
      username: 'username', 
      password: 'password' 
    }).then((response: User) => {
      expect(response).toEqual({
        name: 'John',
        email: 'johndoe@gmail.com',
        phone: '12345',
        skypeId: 'johndoe'
      });
    });
  });

  it('should fail with wrong credentials', () => {
    authService.login({ 
      username: 'username', 
      password: 'p' 
    }).catch((error: Error) => {
      expect(error).toEqual({
        code: 400,
        message: 'Invalid credentials.'
      });
    });
  });
});