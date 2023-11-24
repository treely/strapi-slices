import { render, screen } from '@/test/testUtils';
import { strapiMediaMock } from '@/test/strapiMocks/strapiMedia';
import Hero from '.';
import { HeroProps } from './Hero';

const defaultProps: HeroProps = {
  slice: {
    title: 'Title',
    subTitle: 'Sub title',
    textAlign: 'center',
    additionalButtons: [],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<Hero {...combinedProps} />);
};

describe('The Hero component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays no link if there is no button in the slice', async () => {
    setup();

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('displays a link if there is a button in the slice', () => {
    setup({
      slice: { ...defaultProps.slice, button: { url: 'url', text: 'Link' } },
    });

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
  });

  it('displays the additional buttons', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        button: { id: '1', url: 'url', text: 'Link Left' },
        additionalButtons: [
          {
            button: { id: '2', url: 'url', text: 'Link Right' },
            variant: 'outline',
          },
        ],
      },
    });

    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByText('Link Left')).toBeInTheDocument();
    expect(screen.getByText('Link Right')).toBeInTheDocument();
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

  it('displays a shape if there is a shape in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        textAlign: 'left',
        shape: { id: 1, img: { data: strapiMediaMock }, alt: 'Shape alt text' },
      },
    });

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
