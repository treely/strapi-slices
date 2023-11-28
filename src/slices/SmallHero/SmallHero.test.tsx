import React from 'react';
import { render, screen } from '../../test/testUtils';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import SmallHero from '.';
import { SmallHeroProps } from './SmallHero';

const defaultProps: SmallHeroProps = {
  slice: {
    title: 'Title',
  },
  theme: 'dark',
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<SmallHero {...combinedProps} />);
};

describe('The SmallHero component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays a subtitle if there is a subtitle in the slice', () => {
    setup({ slice: { ...defaultProps.slice, subTitle: 'Sub title' } });

    expect(screen.getByText('Sub title')).toBeInTheDocument();
  });

  it('displays a tagline if there is a tagline in the slice', () => {
    setup({ slice: { ...defaultProps.slice, tagline: 'Tagline' } });

    expect(screen.getByText('Tagline')).toBeInTheDocument();
  });

  it('displays a tag if there is a tag in the slice', () => {
    setup({
      slice: { ...defaultProps.slice, tags: [{ id: 1, text: 'Tag' }] },
    });

    expect(screen.getByText('Tag')).toBeInTheDocument();
  });

  it('displays a link if there is a button in the slice', () => {
    setup({
      slice: { ...defaultProps.slice, button: { url: 'url', text: 'Link' } },
    });

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
  });

  it('displays no image if there is no image in the slice', () => {
    setup();

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('displays an image if there is an image in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        image: { id: 1, img: { data: strapiMediaMock }, alt: 'Image alt text' },
      },
    });

    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Image alt text');
  });
});
