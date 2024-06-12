import { AxiosResponse } from 'axios';
import strapiClient from './strapiClient';
import { STRAPI_DEFAULT_PAGE_SIZE } from '../../constants/strapi';

interface Options {
  filters?: Record<string, any>;
}

/** @deprecated Migrate to getAllSlugsFromStrapi */
const getStaticPathsFromStrapi = async (
  path: string,
  { filters = {} }: Options = { filters: {} }
): Promise<AxiosResponse> => {
  const params: Record<string, any> = {
    locale: 'all',
    'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
    filters,
  };

  return strapiClient.get(path, { params });
};

export default getStaticPathsFromStrapi;
