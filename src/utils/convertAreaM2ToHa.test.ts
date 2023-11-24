import convertAreaM2ToHa from './convertAreaM2ToHa';

describe('The convertAreaM2ToHa util', () => {
  it('converts the area from m2 to ha', () => {
    const result = convertAreaM2ToHa('100');

    expect(result).toBe(0.01);
  });
});
