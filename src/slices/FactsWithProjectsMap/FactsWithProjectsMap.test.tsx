import { render, screen } from '../../test/testUtils';
import FactsWithProjectsMap from '.';
import { FactsWithProjectsMapProps } from './FactsWithProjectsMap';

jest.mock('../ProjectsMap', () => ({
  __esModule: true,
  default: ({ embedded }: { embedded?: boolean }) => (
    <div data-testid="projects-map" data-embedded={embedded}>
      Mocked ProjectsMap
    </div>
  ),
}));

const defaultProps: FactsWithProjectsMapProps = {
  slice: {
    variant: 'gray',
    facts: [
      { key: 'Fact 1', value: 'Value 1' },
      { key: 'Fact 2', value: 'Value 2' },
      { key: 'Fact 3', value: 'Value 3' },
    ],
  },
};

const setup = (props: Partial<FactsWithProjectsMapProps> = {}) => {
  const combinedProps = {
    ...defaultProps,
    ...props,
    slice: { ...defaultProps.slice, ...props.slice },
  };
  render(<FactsWithProjectsMap {...combinedProps} />);
};

describe('The FactsWithProjectsMap component', () => {
  it('displays the facts', () => {
    setup();

    expect(screen.getByText('Fact 1')).toBeInTheDocument();
    expect(screen.getByText('Value 1')).toBeInTheDocument();
    expect(screen.getByText('Fact 2')).toBeInTheDocument();
    expect(screen.getByText('Value 2')).toBeInTheDocument();
    expect(screen.getByText('Fact 3')).toBeInTheDocument();
    expect(screen.getByText('Value 3')).toBeInTheDocument();
  });

  it('displays the title header when slice.title is defined', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        title: 'Test Title',
        tagline: 'Test Tagline',
        subTitle: 'Test Subtitle',
      },
    });

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Tagline')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('does not display the title header when slice.title is undefined', () => {
    setup({
      slice: {
        ...defaultProps.slice,
        tagline: 'Test Tagline',
        subTitle: 'Test Subtitle',
      },
    });

    expect(screen.queryByText('Test Tagline')).toBeNull();
  });

  it('displays a link if there is a button in the slice', () => {
    setup({
      slice: { ...defaultProps.slice, button: { id: 1, url: 'url', text: 'Link' } },
    });

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Link')).toBeInTheDocument();
  });

  it('does not display a link if the button in the slice is undefined', () => {
    setup();

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('renders the ProjectsMap in embedded mode', () => {
    setup();

    const map = screen.getByTestId('projects-map');
    expect(map).toBeInTheDocument();
    expect(map).toHaveAttribute('data-embedded', 'true');
  });
});
