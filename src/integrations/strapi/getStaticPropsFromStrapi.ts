import { AxiosResponse } from 'axios';
import strapiClient from './strapiClient';
import { STRAPI_DEFAULT_PAGE_SIZE } from '../../constants/strapi';

interface Options {
  locale?: string;
  slug?: string;
  preview?: boolean;
  filters?: Record<string, any>;
}

/** @deprecated Migrate to getStrapiSingleType or getStrapiCollectionType */
const getStaticPropsFromStrapi = async (
  path: string,
  { locale = 'en', slug, preview = false, filters = {} }: Options
): Promise<AxiosResponse> => {
  const cache = preview ? false : undefined;
  const enrichedFilters: Record<string, string> = filters;

  if (slug) {
    enrichedFilters.slug = slug;
  }

  const params: Record<string, any> = {
    populate: 'deep,6',
    locale,
    'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
    filters: enrichedFilters,
  };

  if (preview) {
    params.publicationState = 'preview';
  }

  return strapiClient.get(path, { params, cache });
};

export default getStaticPropsFromStrapi;
