import { render, screen } from '@/test/testUtils';
import { strapiMediaMock } from '@/test/strapiMocks/strapiMedia';
import ImageGrid from '.';
import { ImageGridProps } from './ImageGrid';

const defaultProps: ImageGridProps = {
  slice: {
    title: 'Title',

    images: [
      {
        id: 1,
        title: 'Img Title',
        image: { id: 1, alt: 'Alt text 1', img: { data: strapiMediaMock } },
        links: [],
      },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<ImageGrid {...combinedProps} />);
};

describe('The ImageGrid component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays the image titles', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.images[0].title)
    ).toBeInTheDocument();
  });

  it('displays the images', () => {
    setup();

    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      defaultProps.slice.images[0].image.alt
    );
  });

  it('displays the sub title of the image if there is sub title in one of the images of the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        images: [{ ...defaultProps.slice.images[0], subTitle: 'Sub title' }],
      },
    });

    expect(screen.getByText('Sub title')).toBeInTheDocument();
  });

  it('displays a LinkedIn link if there is one', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        images: [
          {
            ...defaultProps.slice.images[0],
            links: [
              {
                id: 1,
                link: { id: 1, text: 'Link', url: 'https://tree.ly' },
                destination: 'linkedin',
              },
            ],
          },
        ],
      },
    });

    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
