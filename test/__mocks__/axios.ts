export default {
  create: (config: {}) => {
    return {
      ...config,
      get: jest.fn().mockReturnValue(Promise.resolve({ data: [] })),
      post: jest.fn().mockReturnValue(Promise.resolve({ data: [] })),
      put: jest.fn().mockReturnValue(Promise.resolve({ data: [] })),
      delete: jest.fn().mockReturnValue(Promise.resolve({ data: [] }))
    }
  }
};
