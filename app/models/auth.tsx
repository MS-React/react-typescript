import { Error } from './error';
import { User } from './user';

export interface Auth {
  authenticating: boolean;
  isAuthenticated: boolean;
  error: Error;
  user: User;
};