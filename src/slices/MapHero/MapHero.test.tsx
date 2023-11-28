import React from 'react';
import { render, screen } from '../../test/testUtils';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import MapHero from '.';
import { MapHeroProps } from './MapHero';

const defaultProps: MapHeroProps = {
  slice: {
    title: 'Title',
    map: {
      id: 1,
      alt: 'Map alt text',
      img: { data: strapiMediaMock },
    },
    mobileMap: {
      id: 1,
      alt: 'Map alt text',
      img: { data: strapiMediaMock },
    },
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<MapHero {...combinedProps} />);
};

describe('The MapHero component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays a map', () => {
    setup();

    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      defaultProps.slice.map.alt
    );
  });

  it('displays no link if there is no button in the slice', async () => {
    setup();

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('displays a link if there is a button in the slice', () => {
    setup({
      slice: { ...defaultProps.slice, buttons: [{ url: 'url', text: 'Link' }] },
    });

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
  });

  it('displays two links if there are two buttons in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        buttons: [
          { url: 'url', text: 'Link-1' },
          { url: 'url', text: 'Link-2' },
        ],
      },
    });

    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByText('Link-1')).toBeInTheDocument();
    expect(screen.getByText('Link-2')).toBeInTheDocument();
  });

  it('displays a shape if there is a shape in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        textAlign: 'left',
        shape: { id: 1, img: { data: strapiMediaMock }, alt: 'Shape alt text' },
      },
    });

    expect(screen.getAllByRole('img').length).toBe(2);
  });
});
