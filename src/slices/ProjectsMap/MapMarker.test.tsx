import React from 'react';
import { fireEvent, render, screen, waitFor } from '../../test/testUtils';
import CreditsAvailableState from '../../models/CreditsAvailableState';
import MapMarker, { MapMarkerProps } from './MapMarker';
import messagesEn from './messages.en';

const defaultProps: MapMarkerProps = {
  title: 'Project title',
  portfolioHost: '',
  isPublic: true,
};

const setup = (props: Partial<MapMarkerProps> = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<MapMarker {...combinedProps} />);
};

describe('The MapMarker component', () => {
  it('renders successfully with minimal props', () => {
    setup({});

    expect(screen.queryByText('Project title')).not.toBeInTheDocument();
  });

  it('renders successfully with minimal props', () => {
    setup({});

    fireEvent.mouseEnter(screen.getByTestId('mapmarker-pin'));

    waitFor(() => {
      expect(screen.findByText('Project title')).toBeInTheDocument();
      expect(screen.findByRole('button')).not.toBeInTheDocument();
    });
  });

  it('renders a button if slug is defined', () => {
    setup({ slug: 'slug' });

    expect(screen.getByTestId('mapmarker-pin').parentElement).toHaveProperty(
      'href',
      'http://localhost/portfolio/slug'
    );

    fireEvent.mouseEnter(screen.getByTestId('mapmarker-pin'));

    waitFor(() => {
      const button = screen.getByText(
        messagesEn['sections.projectsMap.link.text']
      );
      expect(button).toBeInTheDocument();
      expect(button).toHaveProperty('href', '/portfolio/slug');
    });
  });

  it('prefixes the url with the portfolio host', () => {
    setup({ slug: 'slug', portfolioHost: 'https://example.com' });

    expect(screen.getByTestId('mapmarker-pin').parentElement).toHaveProperty(
      'href',
      'https://example.com/portfolio/slug'
    );

    fireEvent.mouseEnter(screen.getByTestId('mapmarker-pin'));

    waitFor(() => {
      const button = screen.getByText(
        messagesEn['sections.projectsMap.link.text']
      );
      expect(button).toBeInTheDocument();
      expect(button).toHaveProperty(
        'href',
        'https://example.com/portfolio/slug'
      );
    });
  });

  it('renders the project developer if it is defined', () => {
    setup({
      projectDeveloper: 'Project developer',
    });

    fireEvent.mouseEnter(screen.getByTestId('mapmarker-pin'));

    waitFor(() => {
      expect(screen.getByText('Project developer')).toBeInTheDocument();
    });
  });

  it('renders the credit availability if it is defined', () => {
    setup({
      creditsAvailable: CreditsAvailableState.YES,
    });

    fireEvent.mouseEnter(screen.getByTestId('mapmarker-pin'));

    waitFor(() => {
      expect(screen.getByText('CREDITS AVAILABLE')).toBeInTheDocument();
    });
  });
});
