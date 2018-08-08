import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import settings from '../../config/settings';

class ApiService {
  http: AxiosInstance = axios.create({
    baseURL: settings.SERVICE.BASE_URL
  });

  create = async (options: { entity: String, data: Object }): Promise<void> => {
    const { entity, data } = options;
    return this.http.post(`/${entity}`, { data }).then(response => response.data);
  }

  update = async (options: { entity: String, id: String, data: Object }): Promise<void> => {
    const { entity, id, data } = options;
    return this.http.put(`/${entity}`, { params: { id }, data }).then(response => response.data);
  }

  read = async (options: { entity: String, id: String }): Promise<void> => {
    const { entity, id } = options;
    return this.http.get(`/${entity}`, { params: { id } }).then(response => response.data);
  }

  delete = async (options: { entity: String, id: String }): Promise<void> => {
    const { entity, id } = options;
    return this.http.delete(`/${entity}`, { params: { id } }).then(response => response.data);
  }
}

export const apiService = new ApiService();
