import MockAxios from 'jest-mock-axios';
import getAllSlugsFromStrapi from './getAllSlugsFromStrapi';
import StrapiPage from '../../models/strapi/StrapiPage';
import { strapiPageMock } from '../../test/strapiMocks/strapiPage';

describe('The getAllSlugsFromStrapi function', () => {
  afterEach(() => {
    MockAxios.reset();
  });

  it('returns all slugs and creates a fallback for locales that dont have a translation', async () => {
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
      .mockRejectedValueOnce({ response: { status: 404 } }); // Hungarian version is missing (404)

    const slugs = await getAllSlugsFromStrapi<StrapiPage>('/api/pages', [
      'en',
      'de',
      'hu',
    ]);

    expect(slugs).toStrictEqual([
      { locale: 'en', slug: strapiPageMock.attributes.slug },
      { locale: 'de', slug: strapiPageMock.attributes.slug },
      // Fallback for 'hu' gets created
      { locale: 'hu', slug: strapiPageMock.attributes.slug },
    ]);

    expect(MockAxios.get).toHaveBeenCalledTimes(3);
  });
});
