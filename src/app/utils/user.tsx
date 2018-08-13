import { get } from 'lodash';
import { User } from 'rootApp/models';

export function getUserId(user = {} as User) {
  let userId = get(user, '_id', null);

  if (!userId) {
    userId = get(user, '_id');
  }

  return userId;
}
