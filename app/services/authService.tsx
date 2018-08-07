import { User } from '../models';

export function login({ username = '', password = ''}) {
  if (username === 'username' && password === 'password') {
    
    const user = () : User => ({
      name: 'John',
      email: 'johndoe@gmail.com',
      phone: '12345',
      skypeId: 'johndoe'
    });

    return new Promise(function (resolve) {
      setTimeout(resolve, Math.random() * 200, user);
    });
  }
  else {
    return new Promise(function (resolve, reject) {
      setTimeout(reject, Math.random() * 200, {
        code: 400,
        message: 'Invalid credentials.'
      });
    });
  }
}
