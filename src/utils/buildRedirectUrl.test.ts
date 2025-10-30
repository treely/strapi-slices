import { buildRedirectUrl } from './buildRedirectUrl';

const ORIGIN = 'https://site.local';

const getParams = (u: string) => new URL(u).searchParams;

describe('buildRedirectUrl', () => {
  let dateNowSpy: jest.SpyInstance<number, []>;

  beforeAll(() => {
    // stable origin for all tests
    Object.defineProperty(window, 'location', {
      value: { ...window.location, origin: ORIGIN },
      writable: true,
    });
  });

  beforeEach(() => {
    // stable timestamp per test
    dateNowSpy = jest.spyOn(Date, 'now').mockReturnValue(1730284800000);
  });

  afterEach(() => {
    dateNowSpy.mockRestore();
  });

  it('returns empty string for empty target url', () => {
    expect(buildRedirectUrl('', '/from', {})).toBe('');
  });

  it('adds absolute source and ts, preserves existing target params', () => {
    const out = buildRedirectUrl(
      'https://redirect.com/landing?existing=value',
      '/from',
      {}
    );
    const p = getParams(out);
    expect(p.get('existing')).toBe('value');
    expect(p.get('source')).toBe(`${ORIGIN}/from`);
    expect(p.get('ts')).toBe('1730284800000');
  });

  it('forwards utm_* params from current page and ignores others', () => {
    const out = buildRedirectUrl('https://redirect.com', '/page', {
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'spring',
      other: 'ignore-me',
    });
    const p = getParams(out);
    expect(p.get('utm_source')).toBe('google');
    expect(p.get('utm_medium')).toBe('cpc');
    expect(p.get('utm_campaign')).toBe('spring');
    expect(p.get('other')).toBeNull();
  });

  it('includes query string in source when asPath has one', () => {
    const out = buildRedirectUrl(
      'https://redirect.com',
      '/from?utm_source=fb&x=1',
      { utm_source: 'fb' }
    );
    const p = getParams(out);
    expect(p.get('source')).toBe(`${ORIGIN}/from?utm_source=fb&x=1`);
  });

  it('handles relative target URLs using window.location.origin', () => {
    const out = buildRedirectUrl('/relative', '/current', {});
    expect(out.startsWith(`${ORIGIN}/relative?`)).toBe(true);
    const p = getParams(out);
    expect(p.get('source')).toBe(`${ORIGIN}/current`);
    expect(p.get('ts')).toBe('1730284800000');
  });

  it('overwrites existing source in target (deduplicated)', () => {
    const out = buildRedirectUrl('https://redirect.com?source=old', '/new', {});
    const p = getParams(out);
    expect(p.get('source')).toBe(`${ORIGIN}/new`);
    expect(p.getAll('source').length).toBe(1);
  });

  it('skips array values from router.query', () => {
    const out = buildRedirectUrl('https://redirect.com', '/x', {
      utm_source: ['a', 'b'] as any,
      utm_medium: ['m'] as any,
    });
    const p = getParams(out);
    expect(p.get('utm_source')).toBeNull();
    expect(p.get('utm_medium')).toBeNull();
  });

  it('does not add utm params when none present', () => {
    const out = buildRedirectUrl('https://redirect.com', '/from', {
      foo: 'bar',
    });
    const p = getParams(out);
    expect(p.get('utm_source')).toBeNull();
    expect(p.get('utm_medium')).toBeNull();
    expect(p.get('utm_campaign')).toBeNull();
    expect(p.get('source')).toBe(`${ORIGIN}/from`);
  });
});
