import { render, screen } from '../../test/testUtils';
import HeroWithHighlights from '.';

describe('The HeroWithHighlights component', () => {
  it('displays the title text', () => {
    render(<HeroWithHighlights slice={{ title: 'Test [Title]' }} />);

    expect(screen.getByText(/Test/)).toBeInTheDocument();
    expect(screen.getByText(/Title/)).toBeInTheDocument();
  });

  it('displays the subtitle when provided', () => {
    render(
      <HeroWithHighlights
        slice={{ title: 'Title', subTitle: 'This is a subtitle' }}
      />
    );

    expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
  });

  it('does not display subtitle when not provided', () => {
    render(<HeroWithHighlights slice={{ title: 'Title' }} />);

    expect(screen.queryByText('subtitle')).not.toBeInTheDocument();
  });

  it('renders highlighted text in a span', () => {
    render(
      <HeroWithHighlights slice={{ title: 'Normal [Highlighted] Text' }} />
    );

    expect(screen.getByText('Highlighted').tagName).toBe('SPAN');
  });

  it('renders with h1 by default', () => {
    render(<HeroWithHighlights slice={{ title: 'Title' }} />);

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('renders with specified heading level', () => {
    render(
      <HeroWithHighlights slice={{ title: 'Title', headingLevel: 'h2' }} />
    );

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});
