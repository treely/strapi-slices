import React from 'react';
import { render } from '../../test/testUtils';
import { mergeDeep } from '../../utils/mergeDeep';
import { useRouter, replaceSpy } from '../../../__mocks__/next/router';
import { DEFAULT_USE_ROUTER_RETURN_VALUE } from '../../test/defaultMocks/next';
import Redirect from '.';
import type { RedirectProps } from './Redirect';

const defaultProps: RedirectProps = {
  slice: { url: 'https://redirect.com' },
};

const setup = (
  props: Partial<RedirectProps> = {},
  routerOverrides: any = {}
) => {
  const combinedProps = mergeDeep(defaultProps, props);
  useRouter.mockReturnValue({
    ...DEFAULT_USE_ROUTER_RETURN_VALUE,
    asPath: '/from',
    query: { utm_source: 'linkedin' },
    replace: replaceSpy,
    ...routerOverrides,
  });
  render(<Redirect {...combinedProps} />);
};

describe('Redirect component', () => {
  const originalDateNow = Date.now;
  const originalLocation = window.location;
  const mockDateNow = jest.fn(() => 1730284800000);
  const mockOrigin = 'https://origin.com';

  beforeEach(() => {
    Date.now = mockDateNow;
    // @ts-ignore - Mocking window.location
    Object.defineProperty(window, 'location', {
      value: { ...originalLocation, origin: mockOrigin },
      writable: true,
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    Date.now = originalDateNow;
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
    useRouter.mockRestore();
    replaceSpy.mockRestore();
  });

  it('calls the redirect URL when rendering preserving the utm_* params and passing the source and ts params', () => {
    setup();

    expect(replaceSpy).toHaveBeenCalledTimes(1);
    const calledUrl = replaceSpy.mock.calls[0][0];
    const url = new URL(calledUrl);

    // URLSearchParams.get automatically decodes values
    expect(url.searchParams.get('source')).toBe('https://origin.com/from');
    expect(url.searchParams.get('utm_source')).toBe('linkedin');
    expect(url.searchParams.get('ts')).toBe('1730284800000');
    expect(url.origin + url.pathname).toBe('https://redirect.com/');
  });

  it('does nothing when slice.url is empty', () => {
    setup({ slice: { url: '' } });

    expect(replaceSpy).not.toHaveBeenCalled();
  });
});
