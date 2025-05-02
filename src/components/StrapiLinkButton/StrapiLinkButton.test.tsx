import React from 'react';
import { render, screen, fireEvent } from '../../test/testUtils';
import StrapiLinkButton from '.';
import { detectAdBlockSpy } from '../../../__mocks__/adblock-detect-react';
import { StrapiLinkButtonProps } from './StrapiLinkButton';
import { AnalyticsContext } from '../ContextProvider/ContextProvider';

const defaultProps: StrapiLinkButtonProps = {
  link: {
    id: 1,
    text: 'Text',
    url: '/url',
  },
};

const mockAnalyticsFunction = jest.fn();

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(
    <AnalyticsContext.Provider value={mockAnalyticsFunction}>
      <StrapiLinkButton {...combinedProps} />
    </AnalyticsContext.Provider>
  );
};

describe('The StrapiLinkButton component', () => {
  afterEach(() => {
    detectAdBlockSpy.mockRestore();
    mockAnalyticsFunction.mockClear();
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

  it('calls analytics function when clicking a regular link', () => {
    setup();
    fireEvent.click(screen.getByRole('link'));
    expect(mockAnalyticsFunction).toHaveBeenCalledWith({
      type: 'track',
      props: {
        action: 'click',
        component: 'StrapiLinkButton',
        buttonText: 'Text',
        buttonUrl: '/url',
      },
    });
  });

  it('calls analytics function when clicking an intercom launcher', () => {
    setup({ link: { id: 1, text: 'Text', intercomLauncher: true } });
    fireEvent.click(screen.getByRole('button'));
    expect(mockAnalyticsFunction).toHaveBeenCalledWith({
      type: 'track',
      props: {
        action: 'click',
        component: 'StrapiLinkButton',
        buttonText: 'Text',
        buttonUrl: '/',
      },
    });
  });

  it('calls analytics function when clicking a mailto link', () => {
    detectAdBlockSpy.mockReturnValue(true);
    setup({ link: { id: 1, text: 'Text', intercomLauncher: true } });
    fireEvent.click(screen.getByRole('link'));
    expect(mockAnalyticsFunction).toHaveBeenCalledWith({
      type: 'track',
      props: {
        action: 'click',
        component: 'StrapiLinkButton',
        buttonText: 'Text',
        buttonUrl: 'mailto:hello@tree.ly',
      },
    });
  });

  it('uses custom component name in analytics if provided', () => {
    setup({ component: 'CustomComponent' });
    fireEvent.click(screen.getByRole('link'));
    expect(mockAnalyticsFunction).toHaveBeenCalledWith({
      type: 'track',
      props: {
        action: 'click',
        component: 'CustomComponent',
        buttonText: 'Text',
        buttonUrl: '/url',
      },
    });
  });
});
