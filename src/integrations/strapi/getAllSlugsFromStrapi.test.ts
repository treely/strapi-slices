import MockAxios from 'jest-mock-axios';
import getAllSlugsFromStrapi from './getAllSlugsFromStrapi';
import StrapiPage from '../../models/strapi/StrapiPage';
import { strapiPageMock } from '../../test/strapiMocks/strapiPage';

describe('The getAllSlugsFromStrapi function', () => {
  afterEach(() => {
    MockAxios.reset();
  });

  it('returns all slugs and creates a fallback for locales that dont have a translation', async () => {
    const slugsPromise = getAllSlugsFromStrapi<StrapiPage>('/api/pages', [
      'en',
      'de',
      'hu',
    ]);

    // This page is avaliable in 'de' and 'en'
    MockAxios.mockResponseFor(
      { url: '/api/pages' },
      { data: { data: [strapiPageMock] } }
    );

    const slugs = await slugsPromise;

    expect(slugs).toStrictEqual([
      { locale: 'en', slug: strapiPageMock.attributes.slug },
      { locale: 'de', slug: strapiPageMock.attributes.slug },
      // Fallback for 'hu' gets created
      { locale: 'hu', slug: strapiPageMock.attributes.slug },
    ]);
  });
});
