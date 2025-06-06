import { FeatureCollection } from 'geojson';
import { IStrapiData, IStrapiResponse, StrapiProject } from '../..';
import {
  STRAPI_DEFAULT_PAGE_SIZE,
  STRAPI_DEFAULT_POPULATE_DEPTH,
} from '../../constants/strapi';
import fpmClient from '../fpmClient';
import strapiClient from './strapiClient';

const FALLBACK_LOCALE = 'en';

const getPortfolioProjectsByBbox = async (
  bbox: string,
  locale: string = 'en',
  preview: boolean = false
): Promise<FeatureCollection> => {
  const [west, south, east, north] = bbox.split(',').map(Number);
  const cache = preview ? false : undefined;
  const strapiParams: Record<string, any> = {
    pLevel: STRAPI_DEFAULT_POPULATE_DEPTH,
    locale,
    'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
    status: preview ? 'draft' : 'published',
  };

  const [
    fpmResponse,
    { data: strapiProjectsLocalized },
    { data: strapiProjectsEnglish },
  ] = await Promise.all([
    fpmClient.get<FeatureCollection>('/public/projects', {
      params: {
        bbox: `${west},${south},${east},${north}`,
      },
      cache,
    }),
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

  const strapiProjects = new Map<string, IStrapiData<StrapiProject>>();

  for (const project of [
    ...strapiProjectsEnglish.data,
    ...strapiProjectsLocalized.data,
  ]) {
    if (project.attributes.fpmProjectId) {
      strapiProjects.set(project.attributes.fpmProjectId, project);
    }
  }

  const featureCollection = fpmResponse.data;

  // Add slug and portfolioHost to each feature's properties
  featureCollection.features = featureCollection.features.map((feature) => {
    const fpmProjectId = feature.properties?.id;
    const strapiProject = fpmProjectId
      ? strapiProjects.get(fpmProjectId)
      : null;

    if (strapiProject) {
      feature.properties = {
        ...feature.properties,
        slug: strapiProject.attributes.slug || undefined,
        portfolioHost:
          strapiProject.attributes.portfolio?.data?.attributes.host ||
          undefined,
      };
    }

    return feature;
  });

  return featureCollection;
};

export default getPortfolioProjectsByBbox;
