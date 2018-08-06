import { User } from './user';

export interface Auth {
  authenticating: boolean;
  isAuthenticated: boolean;
  error: boolean;
  errorMessage: string;
  user: User;
};