import { getClosestRatio } from './utils';

describe('The getClosestRatio util', () => {
  it('calculates the closest allowed ratio', () => {
    expect(getClosestRatio(100, 100)).toBe(1 / 1);
    expect(getClosestRatio(2, 3)).toBe(2 / 3);
    expect(getClosestRatio(3, 2)).toBe(3 / 2);
    expect(getClosestRatio(3.2, 2.8)).toBe(1 / 1);
  });
});
