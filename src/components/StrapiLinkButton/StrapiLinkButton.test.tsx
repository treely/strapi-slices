import React from 'react';
import { render, screen } from '../../test/testUtils';
import StrapiLinkButton from '.';
import { detectAdBlockSpy } from '../../../__mocks__/adblock-detect-react';
import { StrapiLinkButtonProps } from './StrapiLinkButton';

const defaultProps: StrapiLinkButtonProps = {
  link: {
    id: 1,
    text: 'Text',
    url: '/url',
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<StrapiLinkButton {...combinedProps} />);
};

describe('The StrapiLinkButton component', () => {
  afterEach(() => {
    detectAdBlockSpy.mockRestore();
  });

  it('displays a link', () => {
    setup();

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('displays the button as a link if an url is passed in the link', () => {
    setup();

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      defaultProps.link.url
    );
  });

  it('displays the custom HubSpot launcher if intercomLauncher is true in the link', () => {
    setup({ link: { id: 1, text: 'Text', intercomLauncher: true } });

    expect(screen.getByRole('button')).not.toHaveAttribute(
      'href',
      defaultProps.link.url
    );
  });

  it('opens an email to hello@tree.ly if an ad blocker is active and intercomLauncher is true', () => {
    detectAdBlockSpy.mockReturnValue(true);

    setup({ link: { id: 1, text: 'Text', intercomLauncher: true } });

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'mailto:hello@tree.ly'
    );
  });
});
