import strapiClient from './strapiClient';
import {
  STRAPI_DEFAULT_PAGE_SIZE,
  STRAPI_FALLBACK_LOCALE,
} from '../../constants/strapi';
import IStrapiData from '../../models/strapi/IStrapiData';
import IStrapiResponse from '../../models/strapi/IStrapiResponse';
import LocalizedEntity from '../../models/LocalizedEntity';

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

  const sharedParams = {
    pLevel: '6',
    'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
    filters,
    ...(preview ? { publicationState: 'preview' } : {}),
  };

  const requestedLocaleData = await strapiClient
    .get<IStrapiResponse<IStrapiData<T>[]>>(path, {
      params: {
        ...sharedParams,
        locale,
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
    });

  const fallbackLocaleData = await strapiClient
    .get<IStrapiResponse<IStrapiData<T>[]>>(path, {
      params: {
        ...sharedParams,
        locale: STRAPI_FALLBACK_LOCALE,
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
    });

  const results = fallbackLocaleData.map((fallbackLocaleDataEntry) => {
    const requestedLocale = requestedLocaleData.find(
      (localized) =>
        localized.attributes[key] === fallbackLocaleDataEntry.attributes[key]
    );

    return requestedLocale || fallbackLocaleDataEntry;
  });

  return results;
};

export default getStrapiCollectionType;
