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

  const responses: IStrapiData<T>[] = [];

  for (const loc of allLocales) {
    const params: Record<string, any> = {
      pLevel: '6',
      loc,
      'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
      filters,
    };

    if (preview) {
      params.publicationState = 'preview';
    }

    const { data } = await strapiClient.get<IStrapiResponse<IStrapiData<T>[]>>(
      path,
      { params, cache }
    );

    responses.push(...data.data);
  }

  const groupedResponses = responses.reduce<Record<string, IStrapiData<T>>>(
    (acc, response) => {
      const keyValue = response.attributes[key];
      if (!acc[keyValue] || response.attributes.locale === locale) {
        acc[keyValue] = response;
      }
      return acc;
    },
    {}
  );

  return Object.values(groupedResponses);
};

export default getStrapiCollectionType;
