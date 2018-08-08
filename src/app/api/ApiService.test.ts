import { apiService } from './ApiService';
import settings from '../../config/settings';

describe('ApiService', () => {
  describe('create', () => {
    beforeEach(async () => {
      await apiService.create({
        entity: 'user',
        data: {
          name: 'John',
          lastname: 'Doe'
        }
      });
    });

    it('should call POST verb from axios api', () => {
      expect(apiService.http.post).toHaveBeenCalledWith('/user', {
        data: {
          name: 'John',
          lastname: 'Doe'
        }
      });
    });
  });

  describe('update', () => {
    beforeEach(async () => {
      await apiService.update({
        entity: 'user',
        id: 'user-id-1',
        data: {
          name: 'John',
          lastname: 'UpdateDoe'
        }
      });
    });

    it('should call PUT verb from axios api', () => {
      expect(apiService.http.put).toHaveBeenCalledWith('/user', {
        data: {
          name: 'John',
          lastname: 'UpdateDoe'
        },
        params: {
          id: 'user-id-1'
        }
      });
    });
  });

  describe('read', () => {
    beforeEach(async () => {
      await apiService.read({
        entity: 'user',
        id: 'user-id-1'
      });
    });

    it('should call GET verb from axios api', () => {
      expect(apiService.http.get).toHaveBeenCalledWith('/user', {
        params: {
          id: 'user-id-1'
        }
      });
    });
  });

  describe('delete', () => {
    beforeEach(async () => {
      await apiService.delete({
        entity: 'user',
        id: 'user-id-1'
      });
    });

    it('should call DELETE verb from axios api', () => {
      expect(apiService.http.delete).toHaveBeenCalledWith('/user', {
        params: {
          id: 'user-id-1'
        }
      });
    });
  });

  describe('http', () => {
    it('should have a baseURL property with the expected value regarding the environment', () => {
      expect(apiService.http.baseURL).toEqual(settings.SERVICE.BASE_URL);
    });
  });
});
