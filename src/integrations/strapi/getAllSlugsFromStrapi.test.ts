import MockAxios from 'jest-mock-axios';
import getAllSlugsFromStrapi from './getAllSlugsFromStrapi';
import StrapiPage from '../../models/strapi/StrapiPage';
import { strapiPageMock } from '../../test/strapiMocks/strapiPage';
import getAvailableLocalesFromStrapi from './getAvailableLocalesFromStrapi';

jest.mock('./getAvailableLocalesFromStrapi', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('The getAllSlugsFromStrapi function', () => {
  afterEach(() => {
    MockAxios.reset();
    jest.clearAllMocks();
  });

  it('returns all slugs and creates a fallback for locales that dont have a translation', async () => {
    (getAvailableLocalesFromStrapi as jest.Mock).mockResolvedValue([
      'en',
      'de',
      'hu',
    ]);

    const slugsPromise = getAllSlugsFromStrapi<StrapiPage>('/api/pages', [
      'en',
      'de',
      'hu',
    ]);

    // This page is available in 'de', 'en', and 'hu'
    MockAxios.get
      .mockResolvedValueOnce({ data: { data: [strapiPageMock] } }) // english
      .mockResolvedValueOnce({
        data: {
          data: [
            {
              ...strapiPageMock,
              attributes: {
                ...strapiPageMock.attributes,
                locale: 'de',
              },
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          data: [
            {
              ...strapiPageMock,
              attributes: {
                ...strapiPageMock.attributes,
                locale: 'hu',
              },
            },
          ],
        },
      });

    const slugs = await slugsPromise;

    expect(slugs).toStrictEqual([
      { locale: 'en', slug: strapiPageMock.attributes.slug },
      { locale: 'de', slug: strapiPageMock.attributes.slug },
      // Fallback for 'hu' gets created
      { locale: 'hu', slug: strapiPageMock.attributes.slug },
    ]);
  });
});
