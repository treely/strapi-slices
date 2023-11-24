import { render, screen } from '@/test/testUtils';
import { CtaOnlyProps } from './CtaOnly';
import CtaOnly from '.';

const defaultProps: CtaOnlyProps = {
  slice: {
    button: {
      id: 1,
      text: 'Link',
      url: 'url',
    },
  },
};

const setup = () => {
  render(<CtaOnly {...defaultProps} />);
};

describe('The CTAOnly component', () => {
  it('displays a link', () => {
    setup();

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
  });
});
