import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row } from 'reactstrap';
import { User } from 'rootApp/models';
import ActionButtons from 'rootApp/components/Buttons/ActionButtons';
import Header from 'rootApp/components/Layout';
import Table from 'rootApp/components/Table';
import * as usersActions from 'rootApp/actions/usersActions';

import './HomePage.scss';

interface HomePageProps {
  users: User[];
  usersActions: any;
}

interface HomePageState {
  user: User;
}

export class HomePage extends React.Component<HomePageProps, HomePageState> {

  state = {
    user: {} as User
  };

  componentDidMount() {
    this.props.usersActions.getUsers();
  }

  setSelectedUser = (user: User) => {
    this.setState({
      user
    }, function () {
      this.props.usersActions.selectUser(user);
    });
  }

  handleUserActionType = (type: any = 'add', user: User) => {
    const { usersActions } = this.props;

    switch (type) {
      case 'add':
        return usersActions.createUser(user);
      case 'edit':
        return usersActions.updateUser(user);
      case 'delete':
        return usersActions.deleteUser(user);
      default:
        //errorService.logErrors('Invalid User action Type', 'HomePage.jsx');
    }
  }

  render() {
    return (
      <div className="home-page">
        <div className="home-page--header">
          <Header />
        </div>
        <div className="container">
          <Row>
            <Col md="8">
              <h4>Users List</h4>
            </Col>
            <Col md="4">
              <div className="home-page--action-buttons">
                <ActionButtons
                  user={this.state.user}
                  onConfirm={this.handleUserActionType}
                />
              </div>
            </Col>
          </Row>
          <div className="home-page--table">
            <Table 
              userSelected={this.state.user}
              users={this.props.users}
              handleSelected={this.setSelectedUser} />
          </div>
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state: any) {
  return {
    users: state.users.data
  };
}

export function mapDispatchToProps(dispatch: any) {
  return {
    usersActions: bindActionCreators(usersActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
