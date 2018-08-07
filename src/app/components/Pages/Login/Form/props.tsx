import { Error } from '../../../../models';
export default interface LoginFormProps {
  error: Error,
  onSubmit: ((username: string, password: string) => void);
};
