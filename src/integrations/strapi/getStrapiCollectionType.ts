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
  const params: Record<string, any> = {
    populate: 'deep,6',
    locale: 'all',
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

  const localizedResponses = data.data.filter(
    (d) => d.attributes.locale === locale
  );

  const fallbackResponses = data.data.filter(
    (d) => d.attributes.locale === STRAPI_FALLBACK_LOCALE
  );

  const responses = fallbackResponses.map((fallbackResponse) => {
    const localizedResponse = localizedResponses.find(
      (localized) =>
        localized.attributes[key] === fallbackResponse.attributes[key]
    );

    return localizedResponse || fallbackResponse;
  });

  return responses;
};

export default getStrapiCollectionType;
