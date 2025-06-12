import { IStrapiData, IStrapiResponse, StrapiProject } from '../..';
import {
  STRAPI_DEFAULT_PAGE_SIZE,
  STRAPI_DEFAULT_POPULATE_DEPTH,
} from '../../constants/strapi';
import strapiClient from './strapiClient';

const FALLBACK_LOCALE = 'en';

const getStrapiProjects = async (
  locale: string = 'en',
  pLevel: string = STRAPI_DEFAULT_POPULATE_DEPTH,
  preview: boolean = false
): Promise<Map<string, IStrapiData<StrapiProject>>> => {
  const cache = preview ? false : undefined;
  const strapiParams: Record<string, any> = {
    pLevel,
    locale,
    'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
    status: preview ? 'draft' : 'published',
  };

  const strapiProjects = new Map<string, IStrapiData<StrapiProject>>();

  try {
    const [strapiProjectsLocalized, strapiProjectsEnglish] = await Promise.all([
      strapiClient.get<IStrapiResponse<IStrapiData<StrapiProject>[]>>(
        '/projects',
        { params: strapiParams, cache }
      ),
      strapiClient.get<IStrapiResponse<IStrapiData<StrapiProject>[]>>(
        '/projects',
        {
          params: { ...strapiParams, locale: FALLBACK_LOCALE },
          cache,
        }
      ),
    ]);

    // Process Strapi data if we got it
    for (const project of [
      ...strapiProjectsEnglish.data.data,
      ...strapiProjectsLocalized.data.data,
    ]) {
      if (project.attributes.fpmProjectId) {
        strapiProjects.set(project.attributes.fpmProjectId, project);
      }
    }
  } catch (error) {
    console.warn('Failed to fetch Strapi data:', error);
    // Return empty map on failure
  }

  return strapiProjects;
};

export default getStrapiProjects;
