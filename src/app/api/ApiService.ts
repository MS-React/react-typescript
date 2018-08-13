import axios, { AxiosInstance } from 'axios';
import settings from '../../config/settings';

class ApiService {
  http: AxiosInstance = axios.create({
    baseURL: settings.SERVICE.BASE_URL
  });

  create = async (options: { entity: String, data: Object }): Promise<void> => {
    const { entity, data } = options;
    return this.http.post(`/${entity}`, data).then(response => response.data);
  }

  update = async (options: { entity: String, id: String, data: Object }): Promise<void> => {
    const { entity, id, data } = options;
    return this.http.put(`/${entity}/${id}`, data).then(response => response.data);
  }

  getAll = async (options: { entity: String, params: Object }): Promise<void> => {
    const { entity, params } = options;
    return this.http.get(`/${entity}`, { params }).then((response: any) => response.data);
  }

  get = async (options: { entity: String, id: String }): Promise<void> => {
    const { entity, id } = options;
    return this.http.get(`/${entity}`, { params: { id } }).then(response => response.data);
  }
  
  delete = async (options: { entity: String, id: String }): Promise<void> => {
    const { entity, id } = options;
    return this.http.delete(`/${entity}/${id}`).then(response => response.data);
  }
}

export const apiService = new ApiService();
