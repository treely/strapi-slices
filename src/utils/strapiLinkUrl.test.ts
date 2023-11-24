import { strapiLinkPageMock } from '@/test/strapiMocks/strapiLinkPage';
import strapiLinkUrl from './strapiLinkUrl';

describe('The strapiLinkUrl util', () => {
  it('returns the page slug if there is a page in the given link', () => {
    const result = strapiLinkUrl({
      id: 1,
      text: 'Text',
      page: { data: strapiLinkPageMock },
    });

    expect(result).toBe(`/${strapiLinkPageMock.attributes.slug}`);
  });

  it('returns url if there is no page in the given link', () => {
    const result = strapiLinkUrl({ id: 1, text: 'Text', url: '/url' });

    expect(result).toBe('/url');
  });

  it('return / if undefined is passed in', () => {
    const result = strapiLinkUrl();

    expect(result).toBe('/');
  });
});
