import { Fetch } from './fetch';
import { User } from './user';

export interface Users {
  data: Array<User>;
  fetch: Fetch;
  selectedUser: object;
}