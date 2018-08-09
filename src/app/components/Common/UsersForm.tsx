import * as React from 'react';
import FormInput from 'rootApp/components/Common/Form/FormInput';
import { Row } from 'reactstrap';
import { User } from 'rootApp/models';

interface errors {
  name?: string;
  email?: string;
}

interface UsersFormProps {
  errors: errors;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  user: User;
}

class UsersForm extends React.PureComponent<UsersFormProps, {}> {

  static defaultProps = {
    errors: {
      name: '',
      email: ''
    }
  };

  render() {
    const {user, onChange, errors} = this.props;
    const isNameInvalid = (errors.name && errors.name !== '');
    const isEmailInvalid = (errors.email && errors.email !== '');
    const emailFeedback = errors.email || '';
    return (
      <div>
        <div className="container">
          <Row>
            <section>
              <form>
                <FormInput
                  inputId="name"
                  label="Name"
                  onChange={onChange}
                  value={user.name}
                  name="name"
                  placeholder="Full Name"
                  type="text"
                  required={true}
                  invalid={isNameInvalid}
                  feedback={errors.name}
                />
                <FormInput
                  inputId="email"
                  label="Email"
                  onChange={onChange}
                  value={user.email}
                  name="email"
                  placeholder="Email"
                  type="email"
                  required={true}
                  invalid={isEmailInvalid}
                  feedback={emailFeedback}
                />
                <FormInput
                  inputId="skypeId"
                  label="Skype Id"
                  onChange={onChange}
                  value={user.skypeId}
                  name="skypeId"
                  placeholder="skype Id"
                  type="text"
                />
                <FormInput
                  inputId="phone"
                  label="Phone Number"
                  onChange={onChange}
                  value={user.phone}
                  name="phone"
                  placeholder="Phone Number"
                  type="text"
                />
              </form>
            </section>
          </Row>
        </div>
      </div>
    );
  }
}

export default UsersForm;
