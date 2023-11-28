import React from 'react';
import { strapiLinkPageMock } from '../../test/strapiMocks/strapiLinkPage';
import { render, screen } from '../../test/testUtils';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import TextCarousel from '.';
import { TextCarouselProps } from './TextCarousel';

const defaultProps: TextCarouselProps = {
  slice: {
    title: 'Title',
    slides: [
      {
        id: 1,
        title: 'Card Title 1',
        text: 'Card Text 1',
        icon: { id: 1, alt: 'Alt text 1', img: { data: strapiMediaMock } },
      },
      {
        id: 2,
        title: 'Card Title 2',
        text: 'Card Text 2',
        icon: { id: 2, alt: 'Alt text 2', img: { data: strapiMediaMock } },
      },
      {
        id: 3,
        title: 'Card Title 3',
        text: 'Card Text 3',
        icon: { id: 3, alt: 'Alt text 3', img: { data: strapiMediaMock } },
      },
      {
        id: 4,
        title: 'Card Title 4',
        text: 'Card Text 4',
        icon: { id: 4, alt: 'Alt text 4', img: { data: strapiMediaMock } },
      },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<TextCarousel {...combinedProps} />);
};

describe('The TextCarousel component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays the slide titles', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.slides[0].title)
    ).toBeInTheDocument();
  });

  it('displays the slide texts', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.slides[0].text)
    ).toBeInTheDocument();
  });

  it('displays the icon', () => {
    setup();

    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'alt',
      defaultProps.slice.slides[0].icon.alt
    );
  });

  it('displays the link if a button is in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        button: {
          id: 1,
          text: 'Link text',
          page: strapiLinkPageMock,
        },
      },
    });

    expect(screen.getByRole('link')).toHaveTextContent('Link text');
  });
});
