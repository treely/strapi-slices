export const useSwrConfigMutateMock = jest.fn();

const useSWR = jest.fn().mockReturnValue({
  data: { body: undefined, headers: new Headers() },
  error: undefined,
});
export const useSWRConfig = jest
  .fn()
  .mockReturnValue({ mutate: useSwrConfigMutateMock });
export const mutate = jest.fn();

export default useSWR;
