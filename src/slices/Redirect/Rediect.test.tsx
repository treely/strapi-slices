import React from 'react';
import { render } from '../../test/testUtils';
import { mergeDeep } from '../../utils/mergeDeep';
import { replaceSpy, useRouter } from '../../../__mocks__/next/router';
import Redirect from '.';
import { RedirectProps } from './Redirect';

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
    replaceSpy.mockRestore();
    useRouter.mockRestore();
  });

  it('calls the redirect URL when rendering', () => {
    setup();

    expect(replaceSpy).toHaveBeenCalledWith('https://redirect.com');
  });
});
