import * as React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

interface FormInputProps {
  type: any;
  name: string;
  placeholder: string;
  value: any;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void);
  label: string;
  inputId: string;
  invalid?: boolean;
  required?: boolean;
  feedback?: string;
}

export default class FormInput extends React.PureComponent<FormInputProps, {}> {
  static defaultProps = {
    required: false,
    invalid: false
  };

  render() {
    const {
      type,
      name,
      placeholder,
      value,
      onChange,
      label,
      inputId,
      invalid,
      required,
      feedback
    } = this.props;
    const asteristk = required ? '*' : '';

    return (
      <FormGroup>
        <Label>{label}{asteristk}</Label>
        <label htmlFor={inputId} className="sr-only">{label}</label>
        <Input
          id={inputId}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          invalid={invalid}
        />
        <FormFeedback>{feedback}</FormFeedback>
      </FormGroup>
    );
  }
}
