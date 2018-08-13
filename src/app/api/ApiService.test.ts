import { apiService } from './ApiService';
import settings from '../../config/settings';

describe('ApiService', () => {

  describe('create', () => {
    it('should call POST verb from axios api', async () => {
      await apiService.create({
        entity: 'users',
        data: {
          name: 'John',
          lastname: 'Doe'
        }
      } as any);

      expect(apiService.http.post).toHaveBeenCalledWith('/users', {
        name: 'John',
        lastname: 'Doe'
      } as any);
    });
  });

  describe('update', () => {
    it('should call PUT verb from axios api', async () => {
      await apiService.update({
        entity: 'users',
        id: 'user-id-1',
        data: {
          name: 'John',
          lastname: 'UpdateDoe'
        }
      } as any);

      expect(apiService.http.put).toHaveBeenCalledWith('/users/user-id-1', {
        name: 'John',
        lastname: 'UpdateDoe'
      });
    });
  });
  
  describe('get actions', () => {
    it('should call GET verb from axios api', async () => {

      await apiService.get({
        entity: 'users',
        id: 'user-id-1'
      } as any);

      const getSpy = jest.spyOn(apiService.http, 'get');

      expect(getSpy).toHaveBeenCalledWith('/users', {
        params: {
          id: 'user-id-1'
        }
      } as any);
    });

    it('should call GET verb from axios api', async () => {
      await apiService.getAll({
        entity: 'users',
        params: {
          page: 1,
          limit: 100
        }
      } as any);

      const getSpy = jest.spyOn(apiService.http, 'get');

      apiService.http.get = getSpy as any;

      expect(getSpy).toHaveBeenCalledWith('/users', {
        params: {
          id: 'user-id-1'
        }
      } as any);
    });
  });

  describe('delete', () => {
    it('should call DELETE verb from axios api', async () => {
      await apiService.delete({
        entity: 'users',
        id: 'user-id-1'
      });
      
      expect(apiService.http.delete).toHaveBeenCalledWith('/users/user-id-1');
    });
  });

  describe('http', () => {
    it('should have a baseURL property with the expected value regarding the environment', async () => {
      const http = apiService.http as any;
      expect(http.baseURL).toEqual(settings.SERVICE.BASE_URL);
    });
  });
});
