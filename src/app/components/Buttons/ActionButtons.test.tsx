import * as React from 'react';
import { shallow } from 'enzyme';
import { ActionButtons, mapStateToProps } from 'rootApp/components/Buttons/ActionButtons';
import initialState from 'rootApp/reducers/initialState';

function setup(props?: any) {
  return shallow(
    <ActionButtons
      {...props}
      onCreateUser={jest.fn()}
    />
  );
}

describe('<ActionButtons />', () => {
  it('renders itself', () => {
    // Arrange
    const wrapper = setup({
      user: {}
    });

    // Assert
    expect(wrapper.find('Button')).toHaveLength(3);
    expect(wrapper.find('MsModal')).toHaveLength(1);
  });

  describe('mapStateToProps function', () => {
    it('should return the initial state', () => {
      // Arrange
      const expectedProps = {
        user: {}
      };

      // Act
      const props = mapStateToProps(Object.assign({}, initialState));

      // Assert
      expect(props).toEqual(expectedProps);
    });
  });

  describe('componentWillReceiveProps function', () => {
    it('should set the new selected user', () => {
      // Arrange
      const expectedState = {
        user: {
          _id: 'id',
          email: '',
          name: '',
          phone: '',
          skypeId: ''
        }
      };
      const wrapper = setup({
        user: {
          _id: 'id'
        }
      });
      const instance = wrapper.instance() as ActionButtons;
      // Act
      wrapper.setProps({
        _id: 'other',
        email: 'email',
        name: 'name',
        phone: 'phone',
        skypeId: 'skypeId'
      });

      const state = wrapper.state() as any;
      
      // Assert
      expect(state.user).toEqual({
        _id: 'id',
        email: '',
        name: '',
        phone: '',
        skypeId: ''
      });
    });

    it('should skip setting selected user when it is the same', () => {
      // Arrange
      const user = {
        _id: 'id'
      };
      const expectedState = {
        email: '',
        _id: 'id',
        name: '',
        phone: '',
        skypeId: ''
      };
      const wrapper = setup({
        user
      });
      const state = wrapper.state() as any;
      
      // Act
      wrapper.setProps({user});

      // Assert
      expect(state.user).toEqual(expectedState);
    });

    it('should use default parameters when users are undefined', () => {
      // Arrange
      const expectedState = {
        email: '',
        name: '',
        phone: '',
        skypeId: ''
      };
      const wrapper = setup({
        user: undefined
      });
      const state = wrapper.state() as any;

      // Act
      wrapper.setProps({user: undefined});

      // Assert
      expect(state.user).toEqual(expectedState);
    });
  });

  describe('toggleModal Functions', () => {
    const state = {
      actionType: '',
      errors: {},
      isUserModalOpen: true,
      modalBody: {},
      modalTitle: '',
      modalYesLabel: '',
      user: {
        email: '',
        name: '',
        phone: '',
        skypeId: ''
      }
    };

    it('should toggle Add Modal', () => {
      // Arrange
      const wrapper = setup({
        user: {}
      });
      const expectedState = {
        ...state,
        actionType: 'add',
      };

      // Act
      wrapper.find('Button[color="primary"]').simulate('click');

      // Assert
      expect(wrapper.state()).toEqual(expectedState);
    });

    it('should toggle Edit Modal', () => {
      // Arrange
      const wrapper = setup({
        user: {}
      });
      const expectedState = {
        ...state,
        actionType: 'edit',
      };

      // Act
      wrapper.find('Button[color="info"]').simulate('click');

      // Assert
      expect(wrapper.state()).toEqual(expectedState);
    });

    it('should toggle Delete Modal', () => {
      // Arrange
      const wrapper = setup({
        user: {}
      });
      const expectedState = {
        ...state,
        actionType: 'delete',
      };

      // Act
      wrapper.find('Button[color="danger"]').simulate('click');

      // Assert
      expect(wrapper.state()).toEqual(expectedState);
    });
  });

  describe('saveUser handler', () => {
    it('should not saveUser', () => {
      // Arrange
      const onConfirm = jest.fn();
      const wrapper = setup({
        user: {},
        onConfirm
      });
      const instance = wrapper.instance() as ActionButtons;

      // Act
      instance.saveUser();

      // Assert
      expect(onConfirm).toHaveBeenCalledTimes(0);
    });

    it('should saveUser', () => {
      // Arrange
      const onConfirm = jest.fn().mockReturnValue(Promise.resolve());
      const wrapper = setup({
        user: {
          name: 'John Doe',
          email: 'john@doe.com'
        },
        onConfirm
      });
      const instance = wrapper.instance() as ActionButtons;

      // Act
      instance.saveUser();

      // Assert
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('should not call onConfirm when it\'s not a function', () => {
      // Act
      const onConfirm = undefined as any;
      const wrapper = setup({
        user: {
          name: 'John Doe',
          email: 'john@doe.com'
        },
        onConfirm
      });
      const instance = wrapper.instance() as ActionButtons;
      instance.toggle = jest.fn();

      // Arrange
      instance.saveUser();

      // Assert
      expect(instance.toggle).toHaveBeenCalledTimes(0);
    });
  });

  describe('update user state on users form change', () => {
    it('should set new state', () => {
      // Arrange
      const event = {
        target: {
          name: 'name',
          value: 'John Doe'
        }
      } as React.ChangeEvent<HTMLInputElement>;
      const expectedUserState = {
        email: '',
        name: 'John Doe',
        phone: '',
        skypeId: ''
      };
      const wrapper = setup({});

      // Act
      const instance = wrapper.instance() as ActionButtons;
      instance.updateUserState(event);
      const state = wrapper.state() as any;

      // Assert
      expect(state.user).toEqual(expectedUserState);
    });
  });

  describe('cancel modal editions', () => {
    it('should reset selected user to state', () => {
      // Arrange
      const expectedUserState = {
        _id: '1',
        email: 'john@doe.com',
        name: 'John Doe',
        phone: '123456',
        skypeId: 'jdoe'
      };
      const wrapper = setup({
        user: expectedUserState
      });
      const instance = wrapper.instance() as ActionButtons;
      const state = wrapper.state() as any;

      // Act
      instance.cancel();

      // Assert
      expect(state.user).toEqual(expectedUserState);
    });

    it('should reset state to empty user', () => {
      // Arrange
      const expectedUserState = {
        email: '',
        name: '',
        phone: '',
        skypeId: ''
      };
      const wrapper = setup({
        user: {}
      });
      const instance = wrapper.instance() as ActionButtons;
      const state = wrapper.state() as any;

      // Act
      instance.cancel();

      // Assert
      expect(state.user).toEqual(expectedUserState);
    });
  });

  describe('getModalLabels', () => {
    it('should use default parameter', () => {
      // Arrange
      const expected = {confirmButtonText: 'Save'};
      const wrapper = setup({});
      const instance = wrapper.instance() as ActionButtons;

      // Act
      const label = instance.getModalLabels();

      // Assert
      expect(label).toEqual(expected);
    });
  });
});
