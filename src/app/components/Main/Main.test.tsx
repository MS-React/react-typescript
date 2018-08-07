import * as React from 'react';
import { shallow } from 'enzyme';
import { Main, mapDispatchToProps, mapStateToProps } from './Main';
import { StoreState } from 'rootApp/models';

function setup(props: any) {
  return shallow(<Main {...props} />);
}

describe('<Main /> component', () => {
  it('renders itself', () => {
    // Arrange
    const wrapper = setup({
      actions: {},
      usersActions: {}
    });

    // Assert
    expect(wrapper.find('Switch')).toHaveLength(1);
    expect(wrapper.find('Route')).toHaveLength(2);
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

      // Act
      const props = mapStateToProps(state);

      // Assert
      expect(props.isAuthenticated).toBe(false);
    });
  });

  describe('mapDispatchToProps functions', () => {
    it('actions prop should be defined', () => {
      // Arrange
      const dispatch = () => { };
      // Act
      const props = mapDispatchToProps(dispatch);

      // Assert
      expect(props.actions).toBeDefined();
    });

    it('should return the binded actions', () => {
      // Arrange
      const dispatch = () => { };
      const expectedActions = [
        'loginRequest',
        'loginSuccess',
        'loginFailed',
        'login'
      ];

      // Act
      const props = mapDispatchToProps(dispatch);

      // Assert
      expect(Object.keys(props.actions)).toEqual(expectedActions);
    });
  });
});
