import { render, screen } from '@/test/testUtils';
import { strapiMediaMock } from '@/test/strapiMocks/strapiMedia';
import ImageTextSequence from '.';
import { ImageTextSequenceProps } from './ImageTextSequence';

const defaultProps: ImageTextSequenceProps = {
  slice: {
    title: 'Title',
    imageTextRows: [
      {
        id: 1,
        title: 'Row Title',
        text: 'Row Text',
        image: { id: 1, alt: 'Alt text 1', img: { data: strapiMediaMock } },
      },
    ],
    background: true,
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<ImageTextSequence {...combinedProps} />);
};

describe('The ImageTextSequence component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays the titles of the rows', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.imageTextRows[0].title)
    ).toBeInTheDocument();
  });

  it('displays the texts of the rows', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.imageTextRows[0].text)
    ).toBeInTheDocument();
  });

  it('displays the images of the rows', () => {
    setup();

    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getAllByRole('img')[1]).toHaveAttribute(
      'alt',
      defaultProps.slice.imageTextRows[0].image.alt
    );
  });

  it('displays a link if there is a button in the row', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        imageTextRows: [
          {
            ...defaultProps.slice.imageTextRows[0],
            button: { url: 'url', text: 'Link' },
          },
        ],
      },
    });

    expect(screen.queryByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
  });

  it('displays the background map if background is set to true', () => {
    setup();

    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'Map');
  });

  it('displays no background map if background is set to false', () => {
    setup({
      slice: { ...defaultProps.slice, background: false },
    });

    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(screen.getAllByRole('img')[0]).not.toHaveAttribute('alt', 'Map');
  });
});
