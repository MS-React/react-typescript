import { createAuthInstance } from 'rootApp/reducers/authReducer';
import { createUsersInstance } from 'rootApp/reducers/usersReducer';

export default {
  auth: createAuthInstance(),
  users: createUsersInstance(),
  routing: null
};
