import { render, screen } from '@/test/testUtils';
import { strapiMediaMock } from '@/test/strapiMocks/strapiMedia';
import FullWidthImage from '.';
import { FullWidthImageProps } from './FullWidthImage';

const defaultProps: FullWidthImageProps = {
  slice: {
    title: 'Title',
    image: { id: 1, alt: 'Alt text', img: { data: strapiMediaMock } },
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<FullWidthImage {...combinedProps} />);
};

describe('The FullWidthImage component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays the image', () => {
    setup();

    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      defaultProps.slice.image.alt
    );
  });
});
