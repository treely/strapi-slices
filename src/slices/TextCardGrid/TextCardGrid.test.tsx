import React from 'react';
import { render, screen } from '../../test/testUtils';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import TextCardGrid from '.';
import { TextCardGridProps } from './TextCardGrid';

const defaultProps: TextCardGridProps = {
  slice: {
    title: 'Title',

    cards: [
      {
        id: 1,
        tagline: 'Card Tagline 1',
        title: 'Card Title 1',
        text: 'Card Text 1',
        image: { id: 1, alt: 'Alt text 1', img: { data: strapiMediaMock } },
      },
      {
        id: 2,
        title: 'Card Title 2',
        text: 'Card Text 2',
        image: { id: 2, alt: 'Alt text 2', img: { data: strapiMediaMock } },
        buttons: [
          { id: 1, url: 'url', text: 'Learn more' },
          { id: 2, url: 'url', text: 'Contact us', intercomLauncher: true },
        ],
      },
      {
        id: 3,
        title: 'Card Title 3',
        text: 'Card Text 3',
        image: { id: 3, alt: 'Alt text 3', img: { data: strapiMediaMock } },
      },
      {
        id: 4,
        title: 'Card Title 4',
        text: 'Card Text 4',
        image: { id: 4, alt: 'Alt text 4', img: { data: strapiMediaMock } },
      },
    ],
    variant: 'shape',
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<TextCardGrid {...combinedProps} />);
};

describe('The TextCardGrid component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays the card tagline if there is a card tagline in the slice', () => {
    setup();

    expect(screen.getByText('Card Tagline 1')).toBeInTheDocument();
  });

  it('displays the card titles', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.cards[0].title)
    ).toBeInTheDocument();
  });

  it('displays the card texts', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.cards[0].text)
    ).toBeInTheDocument();
  });

  it('displays the buttons', () => {
    setup();

    expect(screen.getByText('Contact us')).toBeInTheDocument();
    expect(screen.getByText('Learn more')).toBeInTheDocument();
  });

  it('displays the images for variant shape', () => {
    setup();

    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'alt',
      defaultProps.slice.cards[0].image.alt
    );
  });

  it('displays the images for variant image', () => {
    setup({ slice: { ...defaultProps.slice, variant: 'image' } });

    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'alt',
      defaultProps.slice.cards[0].image.alt
    );
  });
});
