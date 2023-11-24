import { render, screen } from '@/test/testUtils';
import { strapiMediaMock } from '@/test/strapiMocks/strapiMedia';
import IconGrid from '.';
import { IconGridProps } from './IconGrid';

const defaultProps: IconGridProps = {
  slice: {
    iconsWithTextAndButton: [
      {
        id: 1,
        title: 'Img Title',
        text: 'Text',
        icon: { id: 1, alt: 'Alt text 1', img: { data: strapiMediaMock } },
      },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<IconGrid {...combinedProps} />);
};

describe('The IconGrid component', () => {
  it('displays the image titles', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.iconsWithTextAndButton[0].title)
    ).toBeInTheDocument();
  });

  it('displays the texts', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.iconsWithTextAndButton[0].text)
    ).toBeInTheDocument();
  });

  it('displays the icons', () => {
    setup();

    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      defaultProps.slice.iconsWithTextAndButton[0].icon.alt
    );
  });

  it('displays the tagline, title and subTite when they are defined in slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        tagline: 'Tagline',
        title: 'Title',
        subTitle: 'Subtitle',
      },
    });

    expect(screen.getByText('Tagline')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('displays the button when it is defined in slice', () => {
    setup({
      slice: {
        iconsWithTextAndButton: [
          {
            ...defaultProps.slice.iconsWithTextAndButton[0],
            icon: { id: 1, alt: 'Alt text 1', img: { data: strapiMediaMock } },
            button: { id: 1, url: 'url', text: 'Link' },
          },
        ],
      },
    });

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
  });
});
