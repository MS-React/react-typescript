import { Fetch } from './fetch';

describe('Fetch interface', () => {
  
  it('should create interface', () => {
    const state: Fetch = {
      error: 'Error',
      loading: false
    };

    expect(state).toEqual({
      error: 'Error',
      loading: false
    });
  });
});