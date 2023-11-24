import { render, screen } from '@/test/testUtils';
import DocumentsDownloadList from '.';
import { DocumentsDownloadListProps } from './DocumentsDownloadList';
import messagesEn from './messages.en';

const defaultProps: DocumentsDownloadListProps = {
  documentUrls: [
    {
      id: 1,
      url: 'https://example.com/document-1.pdf',
      text: 'Test Document 1',
    },
    {
      id: 2,
      url: 'https://example.com/document-2.pdf',
      text: 'Test Document 2',
    },
  ],
};

const setup = (props = {}) => {
  const combinedProps = { ...defaultProps, ...props };
  render(<DocumentsDownloadList {...combinedProps} />);
};

describe('The DocumentsDownloadList component', () => {
  it('renders existing documentUrls without errors', async () => {
    setup();

    expect(await screen.getByText('Test Document 1')).toBeInTheDocument();
    expect(await screen.getByText('Test Document 2')).toBeInTheDocument();
  });

  it('navigates to the url link when pressing the download button', async () => {
    setup();

    expect(
      screen.getAllByLabelText(
        messagesEn['features.portfolio.documentsDownloadList.downloadDocument']
      )[0]
    ).toHaveAttribute('href', 'https://example.com/document-1.pdf');

    expect(
      screen.getAllByLabelText(
        messagesEn['features.portfolio.documentsDownloadList.downloadDocument']
      )[1]
    ).toHaveAttribute('href', 'https://example.com/document-2.pdf');
  });
});
