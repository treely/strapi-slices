import { AxiosResponse } from 'axios';
import strapiClient from './strapiClient';
import {
  STRAPI_DEFAULT_PAGE_SIZE,
  STRAPI_FALLBACK_LOCALE,
} from '../../constants/strapi';
import IStrapiData from '../../models/strapi/IStrapiData';
import IStrapiResponse from '../../models/strapi/IStrapiResponse';

interface Options {
  locale?: string;
  preview?: boolean;
  filters?: Record<string, any>;
}

const getStrapiSingleType = async <T>(
  path: string,
  { locale = 'en', preview = false, filters = {} }: Options
): Promise<IStrapiData<T>> => {
  const cache = preview ? false : undefined;
  const params: Record<string, any> = {
    pLevel: '6',
    locale,
    'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
    filters,
    status: preview ? 'draft' : 'published',
  };

  let response: AxiosResponse<IStrapiResponse<IStrapiData<T>>>;

  try {
    response = await strapiClient.get(path, { params, cache });
    return response.data.data;
  } catch (error: any) {
    if (error.isAxiosError && error.response?.status === 404) {
      // Retry request with fallback locale
      response = await strapiClient.get(path, {
        params: { ...params, locale: STRAPI_FALLBACK_LOCALE },
        cache,
      });

      return response.data.data;
    }

    throw error;
  }
};

export default getStrapiSingleType;
