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
    jest.clearAllMocks();
  });

  it('returns the localized versions if available', async () => {
    MockAxios.get
      .mockResolvedValueOnce({
        data: {
          data: [
            {
              ...germanStrapiPageMock,
              attributes: {
                ...germanStrapiPageMock.attributes,
                locale: 'de',
              },
            },
          ],
        },
      })
      .mockResolvedValueOnce({ data: { data: [strapiPageMock] } }) // english
      .mockResolvedValueOnce({ data: { data: [] } });

    const pages = getStrapiCollectionType<StrapiPage, 'slug'>(
      '/api/pages',
      'slug',
      { locale: 'de' }
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
    MockAxios.get
      .mockResolvedValueOnce({ data: { data: [strapiPageMock] } }) // english
      .mockRejectedValueOnce({ response: { status: 404 } }) // Hungarian version is missing (404)
      .mockRejectedValueOnce({ response: { status: 404 } }); // German version is missing (404)

    const pages = getStrapiCollectionType<StrapiPage, 'slug'>(
      '/api/pages',
      'slug',
      { locale: 'de' }
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
