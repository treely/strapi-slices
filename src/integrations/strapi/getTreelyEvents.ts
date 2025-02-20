import { AxiosResponse } from 'axios';
import {
  STRAPI_DEFAULT_PAGE_SIZE,
  STRAPI_FALLBACK_LOCALE,
} from '../../constants/strapi';
import IStrapiData from '../../models/strapi/IStrapiData';
import IStrapiResponse from '../../models/strapi/IStrapiResponse';
import StrapiEvent from '../../models/strapi/StrapiEvent';
import strapiClient from './strapiClient';

const getTreelyEvents = async <T>(
  locale: string = 'en',
  preview: boolean = false
): Promise<StrapiEvent[]> => {
  const cache = preview ? false : undefined;
  const params: Record<string, any> = {
    locale,
    'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
  };

  if (preview) {
    params.publicationState = 'preview';
  }

  let response: AxiosResponse<IStrapiResponse<IStrapiData<T>>>;

  try {
    response = await strapiClient.get('/treely-events', { params, cache });
    return [response.data.data].map(
      (item: IStrapiData<T>) => item.attributes as StrapiEvent
    );
  } catch (error: any) {
    if (error.isAxiosError && error.response?.status === 404) {
      // Retry request with fallback locale
      response = await strapiClient.get('/treely-events', {
        params: { ...params, locale: STRAPI_FALLBACK_LOCALE },
        cache,
      });

      return response.data.data
        ? [response.data.data].map(
            (item: IStrapiData<T>) => item.attributes as StrapiEvent
          )
        : [];
    }

    throw error;
  }
};

export default getTreelyEvents;
