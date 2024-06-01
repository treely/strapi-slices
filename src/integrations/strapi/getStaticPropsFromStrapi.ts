import { AxiosResponse } from 'axios';
import strapiClient from './strapiClient';
import { STRAPI_DEFAULT_PAGE_SIZE } from '../../constants/strapi';

interface Options {
  locale?: string;
  slug?: string;
  preview?: boolean;
}

const getStaticPropsFromStrapi = async (
  path: string,
  { locale = 'en', slug, preview = false }: Options
): Promise<AxiosResponse> => {
  const filters: Record<string, string> = {};

  if (slug) {
    filters.slug = slug;
  }

  const params: Record<string, any> = {
    populate: 'deep,6',
    locale,
    'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
    filters,
  };

  if (preview) {
    params.publicationState = 'preview';
  }

  return strapiClient.get(path, { params });
};

export default getStaticPropsFromStrapi;
