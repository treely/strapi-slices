export const setupCache = jest
  .fn()
  .mockImplementation((axiosInstance) => axiosInstance);
