import { render, screen } from '@/test/testUtils';
import { strapiMediaMock } from '@/test/strapiMocks/strapiMedia';
import { SideBySideImagesProps } from './SideBySideImages';
import SideBySideImages from '.';

const defaultProps: SideBySideImagesProps = {
  slice: {
    images: [
      {
        id: 1,
        caption: 'Caption 1',
        img: { id: 1, alt: 'Alt text 1', img: { data: strapiMediaMock } },
      },
      {
        id: 2,
        caption: 'Caption 2',
        img: { id: 2, alt: 'Alt text 2', img: { data: strapiMediaMock } },
      },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<SideBySideImages {...combinedProps} />);
};

describe('The SideBySideImages component', () => {
  it('displays the captions', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.images[0].caption)
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.slice.images[1].caption)
    ).toBeInTheDocument();
  });

  it('displays the images', () => {
    setup();

    expect(screen.getAllByRole('img')[0]).toHaveAttribute(
      'alt',
      defaultProps.slice.images[0].img.alt
    );
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'alt',
      defaultProps.slice.images[1].img.alt
    );
  });
});
