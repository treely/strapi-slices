const useSWRInfinite = jest.fn().mockReturnValue({
  data: [{ body: undefined, headers: new Headers() }],
  error: undefined,
});
export const mutate = jest.fn();

export default useSWRInfinite;
