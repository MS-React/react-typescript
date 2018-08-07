import * as React from 'react';
import { shallow } from 'enzyme';
import { LoginPage, mapDispatchToProps, mapStateToProps } from './LoginPage';
import { StoreState } from '../../../models';

function setup(props: any) {
  return shallow(<LoginPage {...props} />);
}

describe('<LoginPage /> component', () => {
  it('renders itself', () => {
    const wrapper = setup({
      actions: {},
      auth: {
        error: null
      }
    });

    expect(wrapper.find('section')).toHaveLength(1);  
    expect(wrapper.find('LoginForm')).toHaveLength(1);
  });

  it('should handle form submit itself', () => {
    const login = jest.fn();
    const wrapper = setup({
      actions: {
        login
      },
      auth: {
        error: null
      }
    });
    const form = wrapper.find('LoginForm');

    form.simulate('submit');

    expect(login).toHaveBeenCalledTimes(1);
  });

  describe('mapStateToProps functions', () => {
    it('should return the initial state of auth module', () => {
      const state = {
        auth: {
          authenticating: false,
          error: null,
          isAuthenticated: false,
          user: null
        }
      } as StoreState;

      const props = mapStateToProps(Object.assign({}, state));

      expect(props).toEqual(state);
    });
  });

  describe('mapDispatchToProps functions', () => {
    it('actions prop should be defined', () => {

      const dispatch = () => {};

      const props = mapDispatchToProps(dispatch);

      expect(props.actions).toBeDefined();
    });

    it('should return the binded actions', () => {
      const dispatch = () => {};
      const expectedActions = [
        'loginRequest',
        'loginSuccess',
        'loginFailed',
        'login'
      ];

      const props = mapDispatchToProps(dispatch);

      expect(Object.keys(props.actions)).toEqual(expectedActions);
    });
  });
});
