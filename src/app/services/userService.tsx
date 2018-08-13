import axios from 'axios';
import { DEFAULT_API_USERS_ENDPOINT } from 'rootApp/constants/defaults';

export function fetchUsers(params = {}) {
  return axios.get(DEFAULT_API_USERS_ENDPOINT, { params });
}

export function createUsers(data = {}) {
  return axios.post(DEFAULT_API_USERS_ENDPOINT, { ...data });
}

export function deleteUsers(userId: any) {
  return axios.delete(`${DEFAULT_API_USERS_ENDPOINT}/${userId}`);
}

export function updateUsers(userId: any, data = {}) {
  return axios.put(`${DEFAULT_API_USERS_ENDPOINT}/${userId}`, { ...data });
}
