import * as React from 'react';
import { User } from 'rootApp/models';
import { Table, Input } from 'reactstrap';

interface UsersTableProps {
  userSelected?: User;
  users: User[];
  handleSelected?: ((user: User) => void);
}

export class UsersTable extends React.Component<UsersTableProps, {}> {

  selectUser = (user: User) => {
    this.props.handleSelected(user);
  }

  renderUsers() {
    const { userSelected } = this.props;
    const usersItems = this.props.users.map((user: User, index: number) => 
      <tr key={index}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>
          <Input 
            type="checkbox" 
            onChange={this.selectUser.bind(null, user)} 
            checked={(userSelected && userSelected._id === user._id)} /> Check me
        </td>
      </tr>
    );

    return usersItems;
  }

  render() {
    return (
      <div className="users-table">
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsers()}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default UsersTable;