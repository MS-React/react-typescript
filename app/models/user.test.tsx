import { User } from './user';

describe('User interface', () => {
  
  it('should create interface', () => {
    const state: User = {
      name: 'name',
      email: 'email',
      phone: 'phone',
      skypeId: 'skypeId'
    };

    expect(state).toEqual({
      name: 'name',
      email: 'email',
      phone: 'phone',
      skypeId: 'skypeId'
    });
  });

  it('should create interface without optional parameters', () => {
    const state: User = {
      name: 'name',
      email: 'email',
      phone: 'phone'
    };

    expect(state).toEqual({
      name: 'name',
      email: 'email',
      phone: 'phone'
    });
  });
});