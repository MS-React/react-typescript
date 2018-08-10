import { Auth } from './auth';
import { Users } from './users';

export interface StoreState {
  auth: Auth;
  users: Users;
  routing: string;
}