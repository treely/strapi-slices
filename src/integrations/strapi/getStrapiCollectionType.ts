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

  const promises = allLocales.map((loc) => {
    const params: Record<string, any> = {
      pLevel: '6',
      locale: loc,
      'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
      filters,
    };

    if (preview) {
      params.publicationState = 'preview';
    }

    return strapiClient.get<IStrapiResponse<IStrapiData<T>[]>>(path, {
      params,
      cache,
    });
  });

  const responses = await Promise.all(promises);

  const results = responses.flatMap((response) => response.data.data);

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
