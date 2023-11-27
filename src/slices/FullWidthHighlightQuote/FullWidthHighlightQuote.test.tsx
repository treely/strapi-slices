import { render, screen } from '@/test/testUtils';
import { strapiAvatarWithNameMock } from '@/test/strapiMocks/strapiAvatarWithName';
import FullWidthHighlightQuote from '.';
import { FullWidthHighlightQuoteProps } from './FullWidthHighlightQuote';

const defaultProps: FullWidthHighlightQuoteProps = {
  slice: {
    quote: 'Quote',
    avatarWithName: strapiAvatarWithNameMock,
  },
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<FullWidthHighlightQuote {...combinedProps} />);
};

describe('The FullWidthHighlightQuote component', () => {
  it('displays a tagline if there is a tagline in the slice', () => {
    setup({ slice: { ...defaultProps.slice, tagline: 'Tagline' } });

    expect(screen.getByText('Tagline')).toBeInTheDocument();
  });

  it('displays the quote', () => {
    setup();

    expect(screen.getByText(defaultProps.slice.quote)).toBeInTheDocument();
  });

  it('displays the avatar with name', () => {
    setup();

    expect(screen.getByRole('img')).toHaveAttribute(
      'alt',
      strapiAvatarWithNameMock.image.alt
    );
  });
});
