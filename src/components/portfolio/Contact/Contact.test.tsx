import React from 'react';
import { strapiMediaMock } from '../../../test/strapiMocks/strapiMedia';
import { mergeDeep } from '../../../utils/mergeDeep';
import { render, screen } from '../../../test/testUtils';
import { ContactProps } from './Contact';
import Contact from '.';
import { pushSpy, useRouter } from '../../../../__mocks__/next/router';

const defaultProps: ContactProps = {
  title: 'Contact title',
};

const setup = (props = {}) => {
  const combinedProps = mergeDeep(defaultProps, props);
  render(<Contact {...combinedProps} />);
};

describe('The Contact component', () => {
  afterEach(() => {
    pushSpy.mockRestore();
  });

  afterAll(() => {
    useRouter.mockRestore();
  });

  it('displays the correct title, if it is defined', () => {
    setup();

    expect(screen.getByText('Contact title')).toBeInTheDocument();
  });

  it('does not display the title, if it is not defined', () => {
    setup({ title: undefined });

    expect(screen.queryByText('Contact title')).not.toBeInTheDocument();
  });

  it('displays the correct text, button and avatar, if they are defined', () => {
    setup({
      ...defaultProps,
      text: 'Contact text',
      button: { id: 1, url: 'https://tree.ly', text: 'Button' },
      avatar: { id: 1, alt: 'Alt text', img: { data: strapiMediaMock } },
    });

    expect(screen.getByText('Contact text')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByAltText('Alt text')).toBeInTheDocument();
  });
});
