import * as React from 'react';
import { shallow } from 'enzyme';
import { UsersTable } from './UsersTable';

function setup(props?: any) {
  return shallow(<UsersTable {...props} />);
}

describe('<UsersTable /> component', () => {

  it('renders itself', () => {
    // Arrange
    const wrapper = setup({
      users: [{
        '_id': '1',
        name: 'John',
        email: 'john@gmail.com',
        phone: '1234'   
      }, {
        '_id': '2',
        name: 'Jane',
        email: 'jane@gmail.com',
        phone: '1234'  
      }]
    });
  
    // Assert
    expect(wrapper.find('Table')).toHaveLength(1);
    expect(wrapper.find('Input')).toHaveLength(2);
  });

  it('should render without users', () => {
    // Arrange
    const wrapper = setup({
      users: []
    });
  
    // Assert
    expect(wrapper.find('Table')).toHaveLength(1);
    expect(wrapper.find('Input')).toHaveLength(0);
  });

  it('should call select user prop when user is checked', () => {
    // Arrange
    const wrapper = setup({
      users: [{
        '_id': '1',
        name: 'John',
        email: 'john@gmail.com',
        phone: '1234'   
      }, {
        '_id': '2',
        name: 'Jane',
        email: 'jane@gmail.com',
        phone: '1234'  
      }],
      handleSelected: jest.fn()
    });
    // Act
    const instance = wrapper.instance() as UsersTable;
    const spy = jest.spyOn(instance.props, 'handleSelected');

    instance.selectUser({
      '_id': '2',
      name: 'Jane',
      email: 'jane@gmail.com',
      phone: '1234'
    });

    // Assert
    expect(spy).toHaveBeenCalledWith({
      '_id': '2',
      name: 'Jane',
      email: 'jane@gmail.com',
      phone: '1234'    
    });
  });
});