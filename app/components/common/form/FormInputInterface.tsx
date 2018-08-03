import React from 'react';

export interface FormInputInterface {
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