import getCountryFlag from './getCountryFlag';

describe('The getCountryFlag util', () => {
  it('returns flag icon', () => {
    expect(getCountryFlag('DE')).toEqual('🇩🇪');
    expect(getCountryFlag('AT')).toEqual('🇦🇹');
    expect(getCountryFlag('CH')).toEqual('🇨🇭');
  });
});
