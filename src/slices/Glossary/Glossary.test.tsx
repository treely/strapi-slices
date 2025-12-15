import { render, screen, waitFor, userEvent } from '../../test/testUtils';
import Glossary from '.';
import { GlossaryProps } from './Glossary';

const copyToClipboardSpy = jest.fn();
const mockedResult = jest.fn().mockReturnValue({ noUserInteraction: false });

jest.mock('@reactuses/core', () => ({
  ...jest.requireActual('@reactuses/core'),
  useCopyToClipboard: () => [mockedResult(), copyToClipboardSpy],
}));

const defaultProps: GlossaryProps = {
  slice: {
    glossary_items: [
      {
        id: 1,
        attributes: {
          title: 'chocolate-title',
          text: 'chocolate-text',
          slug: 'chocolate-slug',
        },
      },
      {
        id: 2,
        attributes: {
          title: 'ananas-title',
          text: 'ananas-text',
          slug: 'ananas-slug',
        },
      },
      {
        id: 3,
        attributes: {
          title: 'another-title',
          text: 'another-text',
          slug: 'another-slug',
        },
      },
    ],
  },
};

const setup = () => render(<Glossary {...defaultProps} />);

describe('The Glossary component', () => {
  afterEach(() => {
    copyToClipboardSpy.mockClear();
    mockedResult.mockClear();
  });

  it('groups the items by the first letter of the title', () => {
    setup();

    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('the title and text of the items', () => {
    setup();

    expect(screen.getByText('chocolate-title')).toBeInTheDocument();
    expect(screen.getByText('chocolate-text')).toBeInTheDocument();
  });

  it('adds the slug as an id to the title', () => {
    setup();

    expect(screen.getByText('chocolate-title')).toHaveAttribute(
      'id',
      'chocolate-slug'
    );
  });

  it('adds a button that copies the anchor link to the users clipboard', async () => {
    setup();

    await userEvent.click(screen.getAllByRole('button')[0]);

    await waitFor(() => {
      expect(copyToClipboardSpy).toHaveBeenCalledWith(
        'http://localhost/#ananas-slug'
      );
    });
  });

  it('shows a success message when copying succeeded', async () => {
    mockedResult.mockReturnValueOnce({
      noUserInteraction: false,
      value: 'http://localhost/#ananas-slug',
    });

    setup();

    await userEvent.click(screen.getAllByRole('button')[0]);

    await waitFor(() => {
      expect(screen.getByTestId('check-icon')).toBeInTheDocument();
    });
  });
});
