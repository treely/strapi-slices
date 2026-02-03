import React from 'react';
import { render } from '../../test/testUtils';
import { mergeDeep } from '../../utils/mergeDeep';
import { useRouter } from '../../../__mocks__/next/router';
import { DEFAULT_USE_ROUTER_RETURN_VALUE } from '../../test/defaultMocks/next';
import Redirect from '.';
import type { RedirectProps } from './Redirect';

const defaultProps: RedirectProps = {
  slice: { url: 'https://redirect.com' },
};

const locationReplaceSpy = jest.fn();

const setup = (
  props: Partial<RedirectProps> = {},
  routerOverrides: any = {}
) => {
  const combinedProps = mergeDeep(defaultProps, props);
  useRouter.mockReturnValue({
    ...DEFAULT_USE_ROUTER_RETURN_VALUE,
    asPath: '/from',
    query: { utm_source: 'linkedin' },
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
    delete window.location;
    // @ts-ignore - Mocking window.location
    window.location = {
      ...originalLocation,
      origin: mockOrigin,
      replace: locationReplaceSpy,
    };
    jest.clearAllMocks();
  });

  afterEach(() => {
    Date.now = originalDateNow;
    // @ts-ignore - Restoring window.location
    window.location = originalLocation;
    useRouter.mockRestore();
  });

  it('calls window.location.replace with the redirect URL preserving utm_* params and passing source and ts params', () => {
    setup();

    expect(locationReplaceSpy).toHaveBeenCalledTimes(1);
    const calledUrl = locationReplaceSpy.mock.calls[0][0];
    const url = new URL(calledUrl);

    // URLSearchParams.get automatically decodes values
    expect(url.searchParams.get('source')).toBe('https://origin.com/from');
    expect(url.searchParams.get('utm_source')).toBe('linkedin');
    expect(url.searchParams.get('ts')).toBe('1730284800000');
    expect(url.origin + url.pathname).toBe('https://redirect.com/');
  });

  it('does nothing when slice.url is empty', () => {
    setup({ slice: { url: '' } });

    expect(locationReplaceSpy).not.toHaveBeenCalled();
  });
})
  
