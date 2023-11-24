import { render, screen } from '@/test/testUtils';
import { strapiProjectCardMock } from '@/test/strapiMocks/strapiProjectCard';
import TextWithCard from '.';
import { TextWithCardProps } from './TextWithCard';

const defaultProps: TextWithCardProps = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    cardPosition: 'left',
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<TextWithCard {...combinedProps} />);
};

describe('The TextWithCard component', () => {
  it('displays the section header', () => {
    setup();

    expect(screen.getByTestId('default-section-header')).toBeInTheDocument();
  });

  it('displays no check marks if there are no check marks in the slice', () => {
    setup();

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('displays the check marks if there are check marks in the slice', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        listItems: [{ id: 1, text: 'Check mark label' }],
      },
    });

    expect(screen.queryAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText('Check mark label')).toBeInTheDocument();
  });

  it('displays no link if there is no button in the slice', () => {
    setup();

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('displays a link if there is a button in the slice', () => {
    setup({
      slice: { ...defaultProps.slice, button: { url: 'url', text: 'Link' } },
    });

    expect(screen.queryByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
  });

  it('displays no card if there is no card in the slice', () => {
    setup();

    expect(
      screen.queryByText(strapiProjectCardMock.title)
    ).not.toBeInTheDocument();
  });

  it('displays a card if there is a card in the slice', () => {
    setup({
      slice: { ...defaultProps.slice, card: strapiProjectCardMock },
    });

    expect(screen.getByText(strapiProjectCardMock.title)).toBeInTheDocument();
  });

  const cardPositions = ['left', 'right'];

  cardPositions.forEach((cardPosition) => {
    it(`displays the card on the right if the card position is '${cardPosition}'`, () => {
      setup({ slice: { ...defaultProps.slice, cardPosition } });

      expect(
        screen.queryByTestId(`card-position-${cardPosition}`)
      ).toBeInTheDocument();
    });
  });
});
