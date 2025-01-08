import React from 'react';
import { render, screen } from '../../test/testUtils';
import { strapiMediaMock } from '../../test/strapiMocks/strapiMedia';
import { CarouselMarqueeBannerProps } from './CarouselMarqueeBanner';
import CarouselMarqueeBanner from '.';
import { useMediaQuery } from 'boemly';
import useWindowSize from 'react-use/lib/useWindowSize';
import AutoScroll from 'embla-carousel-auto-scroll';

jest.mock('boemly', () => ({
  ...jest.requireActual('boemly'),
  useMediaQuery: jest.fn(),
}));

jest.mock('react-use/lib/useWindowSize', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('embla-carousel-auto-scroll', () => {
  return jest.fn(() => ({
    init: jest.fn(),
    destroy: jest.fn(),
    options: {},
  }));
});

const defaultProps: CarouselMarqueeBannerProps = {
  slice: {
    title: 'Carousel',
    logos: [
      {
        id: 1,
        img: {
          id: 1,
          alt: 'Logo 1',
          img: {
            data: {
              ...strapiMediaMock,
              attributes: {
                ...strapiMediaMock.attributes,
                width: 1000,
                height: 600,
              },
            },
          },
          objectFit: 'contain',
        },
      },
      {
        id: 2,
        img: {
          id: 2,
          alt: 'Logo 2',
          img: {
            data: {
              ...strapiMediaMock,
              attributes: {
                ...strapiMediaMock.attributes,
                width: 800,
                height: 500,
              },
            },
          },
          objectFit: 'cover',
        },
      },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  return render(<CarouselMarqueeBanner {...combinedProps} />);
};

describe('The CarouselMarqueeBanner component', () => {
  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockReturnValue([false]);
    (useWindowSize as jest.Mock).mockReturnValue({ width: 1024 });

    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title when provided', () => {
    setup();
    expect(screen.getByText('Carousel')).toBeInTheDocument();
  });

  it('does not render title when not provided', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        title: undefined,
      },
    });
    expect(screen.queryByText('Carousel')).not.toBeInTheDocument();
  });

  it('renders logos when less than 5 without duplication', () => {
    setup();
    const logos = screen.getAllByRole('img');
    // 2 original logos without duplication
    expect(logos).toHaveLength(2);

    expect(logos[0]).toHaveAttribute('alt', 'Logo 1');
    expect(logos[1]).toHaveAttribute('alt', 'Logo 2');
  });

  it('renders duplicated logos when more than 5 logos exist', () => {
    const moreThanFiveLogos = [
      ...defaultProps.slice.logos,
      ...defaultProps.slice.logos,
      ...defaultProps.slice.logos,
      ...defaultProps.slice.logos,
    ];

    setup({
      slice: {
        ...defaultProps.slice,
        logos: moreThanFiveLogos,
      },
    });

    const logos = screen.getAllByRole('img');
    // Duplicated logos based on window width
    expect(logos.length).toBeGreaterThan(5);
  });

  it('uses mobile speed for auto-scroll on mobile', async () => {
    (useMediaQuery as jest.Mock).mockReturnValue([true]); // Simulate mobile view

    const moreThanFiveLogos = [
      ...defaultProps.slice.logos,
      ...defaultProps.slice.logos,
      ...defaultProps.slice.logos,
      ...defaultProps.slice.logos,
    ];

    setup({
      slice: {
        ...defaultProps.slice,
        logos: moreThanFiveLogos,
      },
    });

    expect(AutoScroll).toHaveBeenCalledWith(
      expect.objectContaining({
        speed: 0.5,
      })
    );
  });

  it('handles empty logos array gracefully', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        logos: [],
      },
    });
    expect(screen.getByText('Carousel')).toBeInTheDocument();
  });

  it('adjusts loop array length based on window width', () => {
    (useWindowSize as jest.Mock).mockReturnValue({ width: 2500 });
    const moreThanFiveLogos = [
      ...defaultProps.slice.logos,
      ...defaultProps.slice.logos,
      ...defaultProps.slice.logos,
      ...defaultProps.slice.logos,
    ];

    setup({
      slice: {
        ...defaultProps.slice,
        logos: moreThanFiveLogos,
      },
    });

    const logos = screen.getAllByRole('img');
    // Ensure more logos are rendered when width > 2000
    expect(logos.length).toBeGreaterThan(5);
  });
});
