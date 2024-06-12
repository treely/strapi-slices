import MockAxios from 'jest-mock-axios';
import getStrapiCollectionType from './getStrapiCollectionType';
import StrapiPage from '../../models/strapi/StrapiPage';
import { strapiPageMock } from '../../test/strapiMocks/strapiPage';

describe('The getStrapiCollectionType function', () => {
  const germanStrapiPageMock = {
    ...strapiPageMock,
    attributes: {
      ...strapiPageMock.attributes,
      locale: 'de',
      title: 'Über uns',
    },
  };

  afterEach(() => {
    MockAxios.reset();
  });

  it('returns the localized versions if available', async () => {
    const pages = getStrapiCollectionType<StrapiPage, 'slug'>(
      '/api/pages',
      'slug',
      { locale: 'de' }
    );

    MockAxios.mockResponseFor(
      { url: '/api/pages' },
      { data: { data: [strapiPageMock, germanStrapiPageMock] } }
    );

    const page = await pages;

    expect(page).toStrictEqual([
      expect.objectContaining({
        attributes: expect.objectContaining({ title: 'Über uns' }),
      }),
    ]);

    expect(page).toHaveLength(1);
  });

  it('returns the english versions if no localized version is available', async () => {
    const pages = getStrapiCollectionType<StrapiPage, 'slug'>(
      '/api/pages',
      'slug',
      { locale: 'de' }
    );

    MockAxios.mockResponseFor(
      { url: '/api/pages' },
      { data: { data: [strapiPageMock] } }
    );

    const page = await pages;

    expect(page).toStrictEqual([
      expect.objectContaining({
        attributes: expect.objectContaining({ title: 'About us' }),
      }),
    ]);

    expect(page).toHaveLength(1);
  });
});
