import React from 'react';
import { render } from '../../test/testUtils';
import { mergeDeep } from '../../utils/mergeDeep';
import { redirectSpy } from '../../../__mocks__/next/navigation';
import Redirect from '.';
import { RedirectProps } from './Redirect';
import { RedirectType } from 'next/navigation';

const defaultProps: RedirectProps = {
  slice: {
    url: 'https://redirect.com',
  },
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<Redirect {...combinedProps} />);
};

describe('The Redirect component', () => {
  afterEach(() => {
    redirectSpy.mockRestore();
  });

  it('calls the redirect URL when rendering', () => {
    setup();

    expect(redirectSpy).toHaveBeenCalledWith(
      'https://redirect.com',
      RedirectType.replace
    );
  });
});
