import { DEFAULT_USE_ROUTER_RETURN_VALUE } from '../../src/test/defaultMocks/next';

export const pushSpy = jest.fn();
export const replaceSpy = jest.fn();

export const useRouter = jest.fn().mockReturnValue({
  ...DEFAULT_USE_ROUTER_RETURN_VALUE,
  push: pushSpy,
  replace: replaceSpy,
});
