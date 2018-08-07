import { Error } from './error';

describe('Error interface', () => {

  it('should create interface', () => {
    const state: Error = {
      code: 400, 
      message: 'Invalid credentials.' 
    };

    expect(state).toEqual({
      code: 400,
      message: 'Invalid credentials.'
    });
  });
});