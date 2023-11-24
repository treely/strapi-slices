import { render, screen } from '@/test/testUtils';
import { strapiQuoteCardMock } from '@/test/strapiMocks/strapiQuoteCard';
import { strapiMediaMock } from '@/test/strapiMocks/strapiMedia';
import { strapiHeroCardMock } from '@/test/strapiMocks/strapiHeroCard';
import QuoteCards from '.';
import { QuoteCardsProps } from './QuoteCards';

const defaultProps: QuoteCardsProps = {
  slice: {
    title: 'Title',
    cards: [strapiQuoteCardMock],
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<QuoteCards {...combinedProps} />);
};

describe('The QuoteCards component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays the card', () => {
    setup();

    expect(screen.getByText(strapiQuoteCardMock.text)).toBeInTheDocument();
  });

  it('displays shapes if there are shapes in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        shapes: [
          { id: 1, alt: 'alt 1', img: { data: strapiMediaMock } },
          { id: 2, alt: 'alt 2', img: { data: strapiMediaMock } },
        ],
      },
    });

    expect(screen.getAllByRole('img')).toHaveLength(3);
  });

  it('displays a hero card if there is a hero in the slice', () => {
    setup({ slice: { ...defaultProps.slice, hero: strapiHeroCardMock } });

    expect(screen.getByText(strapiHeroCardMock.title)).toBeInTheDocument();
  });
});
