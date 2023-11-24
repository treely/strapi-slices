import { render, screen } from '@/test/testUtils';
import { strapiMediaMock } from '@/test/strapiMocks/strapiMedia';
import { strapiContactMock } from '@/test/strapiMocks/strapiContact';
import TextWithTextCards from '.';
import { TextWithTextCardsProps } from './TextWithTextCards';

const defaultProps: TextWithTextCardsProps = {
  slice: {
    title: 'Title',
    cards: [
      {
        id: 1,
        title: 'Card title',
        text: 'Card text',
        icon: { id: 1, alt: 'Alt text 1', img: { data: strapiMediaMock } },
      },
    ],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<TextWithTextCards {...combinedProps} />);
};

describe('The TextWithTextCards component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays the card', () => {
    setup();

    expect(
      screen.getByText(defaultProps.slice.cards[0].title)
    ).toBeInTheDocument();
  });

  it('displays the contact area if there is contact area data in the slice', () => {
    setup({ slice: { ...defaultProps.slice, contact: strapiContactMock } });

    expect(screen.getByText(strapiContactMock.text)).toBeInTheDocument();
  });

  it('displays the shape if there is shape in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        shape: { id: 1, alt: 'Alt text', img: { data: strapiMediaMock } },
      },
    });

    expect(screen.getAllByRole('img')[0]).toHaveAttribute('alt', 'Alt text');
  });
});
