import { render, screen } from '@/test/testUtils';
import { strapiMediaMock } from '@/test/strapiMocks/strapiMedia';
import FullWidthImageSlider from '.';
import { FullWidthImageSliderProps } from './FullWidthImageSlider';

const defaultProps: FullWidthImageSliderProps = {
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
      {
        id: 3,
        caption: 'Caption 3',
        img: { id: 3, alt: 'Alt text 3', img: { data: strapiMediaMock } },
      },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<FullWidthImageSlider {...combinedProps} />);
};

describe('The FullWidthImageSlider component', () => {
  it('displays the images', () => {
    setup();

    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'Alt text 1');
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('alt', 'Alt text 2');
    expect(screen.getAllByRole('img')[2]).toHaveAttribute('alt', 'Alt text 3');
  });

  it('displays the captions', () => {
    setup();

    expect(screen.getByText('Caption 1')).toBeInTheDocument();
    expect(screen.getByText('Caption 2')).toBeInTheDocument();
    expect(screen.getByText('Caption 3')).toBeInTheDocument();
  });
});
