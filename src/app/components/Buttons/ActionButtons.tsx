import * as React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { User, UserFormErrors } from 'rootApp/models';
import { EMAIL_REGEXP } from 'rootApp/constants/defaults';
import MsModal from 'rootApp/components/Common/Modal/MsModal';
import UsersForm from 'rootApp/components/Common/UsersForm';

import './ActionButtons.scss';

const emptyUser = {
  name: '',
  email: '',
  phone: '',
  skypeId: ''
} as User;

const defaultUserModalLabels = {
  confirmButtonText: 'Save'
};


interface ActionButtonsProps {
  user: User;
  onConfirm: ((actionType: string, user: User) => void);
}

interface ActionButtonsState {
  actionType: string;
  errors: UserFormErrors;
  isUserModalOpen: boolean;
  modalTitle: string;
  modalBody: any;
  modalYesLabel: string;
  user: User;
}

export class ActionButtons extends React.Component<ActionButtonsProps, ActionButtonsState> {

  constructor(props: any) {
    super(props);

    this.state = {
      actionType: null,
      errors: {} as UserFormErrors,
      isUserModalOpen: false,
      modalTitle: '',
      modalBody: {},
      modalYesLabel: '',
      user: {
        ...emptyUser, 
        ...props.user
      } as any
    };
  }

  componentWillReceiveProps({ user: newUser }: any) {
    const { user: currentSelectedUser } = this.props;

    if (!this.isUserMatchById(currentSelectedUser, newUser)) {
      this.setState({
        user: {
          ...newUser
        }
      });
    }
  }

  isUserMatchById = (sourceUser = {} as any, targetUser = {} as any) => {
    return sourceUser['_id'] === targetUser['_id'];
  }

  isValidUser = (user: User) => {
    return user.hasOwnProperty('id') && user._id !== '';
  }

  toggle = () => {
    this.setState({
      isUserModalOpen: !this.state.isUserModalOpen
    });
  }

  toggleAddModal = () => {
    this.setState({
      actionType: 'add',
      user: { ...emptyUser }
    }, this.toggle);
  }

  toggleEditModal = () => {
    this.setState({
      actionType: 'edit'
    }, this.toggle);
  }

  toggleDeleteModal = () => {
    this.setState({
      actionType: 'delete'
    }, this.toggle);
  }

  updateUserState = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value
      }
    });
  }

  validateForm = () => {
    const { user } = this.state;
    const isValidUsername = user.name !== '';
    const isValidEmail = EMAIL_REGEXP.test(user.email);
    const errors = {} as UserFormErrors;

    if (!isValidUsername) {
      errors.name = 'User name is required';
    }

    if (!isValidEmail) {
      errors.email = 'Email is invalid';
    }

    this.setState({ errors });

    return errors;
  }

  canSubmitForm = () => {
    const errors = this.validateForm();
    return (Object.keys(errors).length === 0 && errors.constructor === Object);
  }

  saveUser = () => {
    if (!this.canSubmitForm()) {
      return;
    }

    if (typeof this.props.onConfirm === 'function') {
      this.props.onConfirm(this.state.actionType, this.state.user);
      this.toggle();
    }
  }

  cancel = () => {
    let user = emptyUser;

    if (this.isValidUser(this.props.user) === true) {
      user = this.props.user;
    }

    this.setState({
      user: { ...user },
      errors: {}
    }, this.toggle);
  }

  getModalBody = () => {
    const {
      user,
      errors
    } = this.state;

    if (this.state.actionType === 'delete') {
      return (
        <p>{`Are you sure to delete User ${user.name}`}</p>
      );
    }

    return (
      <UsersForm
        onChange={this.updateUserState}
        user={user}
        errors={errors}
      />
    );
  }

  getModalLabels  = (actionType = 'add') => {
    if (actionType === 'delete') {
      return {
        ...defaultUserModalLabels,
        confirmButtonText: 'Delete'
      };
    }

    return defaultUserModalLabels;
  }

  render() {
    const modalBody = this.getModalBody();
    const isUserEditDisabled = this.isValidUser(this.state.user) === false;
    const modalInfo = {
      ...this.getModalLabels(this.state.actionType),
      title: `${this.state.actionType} User`
    };

    return (
      <div className="action-buttons">
        <Button
          color="primary"
          onClick={this.toggleAddModal}
        >Add</Button>
        <Button
          color="info"
          disabled={isUserEditDisabled}
          onClick={this.toggleEditModal}
        >Edit</Button>
        <Button
          color="danger"
          disabled={isUserEditDisabled}
          onClick={this.toggleDeleteModal}
        >Delete</Button>
        <MsModal
          okButtonLabel={modalInfo.confirmButtonText}
          cancelButtonLabel='Cancel'
          body={modalBody}
          isOpen={this.state.isUserModalOpen}
          okCallback={this.saveUser}
          cancelCallback={this.cancel}
          modalTitle={modalInfo.title}
        />
      </div>
    );
  }
}

export function mapStateToProps({ users }: any) {
  return {
    user: users.selectedUser
  };
}

export default connect(mapStateToProps)(ActionButtons);
