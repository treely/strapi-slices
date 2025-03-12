import strapiClient from './strapiClient';
import {
  STRAPI_DEFAULT_PAGE_SIZE,
  STRAPI_FALLBACK_LOCALE,
} from '../../constants/strapi';
import IStrapiData from '../../models/strapi/IStrapiData';
import IStrapiResponse from '../../models/strapi/IStrapiResponse';
import LocalizedEntity from '../../models/LocalizedEntity';
import getAvailableLocalesFromStrapi from './getAvailableLocalesFromStrapi';

interface Options {
  locale?: string;
  slug?: string;
  preview?: boolean;
  filters?: Record<string, any>;
}

const getStrapiCollectionType = async <
  T extends LocalizedEntity<K>,
  K extends string
>(
  path: string,
  key: K,
  { locale = 'en', preview = false, filters = {} }: Options
): Promise<IStrapiData<T>[]> => {
  const cache = preview ? false : undefined;
  const allLocales = await getAvailableLocalesFromStrapi();

  if (!allLocales.includes(STRAPI_FALLBACK_LOCALE)) {
    allLocales.push(STRAPI_FALLBACK_LOCALE);
  }

  const promises = allLocales.map((loc) =>
    strapiClient
      .get<IStrapiResponse<IStrapiData<T>[]>>(path, {
        params: {
          pLevel: '6',
          locale: loc,
          status: 'published',
          'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
          filters,
          ...(preview ? { publicationState: 'preview' } : {}),
        },
        cache,
      })
      .then((response) => response.data.data)
      // when a collection type for a requested locale does not exist, Strapi returns a 404. In this case, we return an empty array instead of throwing an error
      .catch((error) => {
        if (error.response?.status === 404) {
          return [];
        }
        throw error;
      })
  );

  const responses = await Promise.all(promises);

  const results = responses.flat();

  const localizedResponses = results.filter(
    (d) => d.attributes.locale === locale
  );

  const fallbackResponses = results.filter(
    (d) => d.attributes.locale === STRAPI_FALLBACK_LOCALE
  );

  const result = fallbackResponses.map((fallbackResponse) => {
    const localizedResponse = localizedResponses.find(
      (localized) =>
        localized.attributes[key] === fallbackResponse.attributes[key]
    );

    return localizedResponse || fallbackResponse;
  });

  return result;
};

export default getStrapiCollectionType;
