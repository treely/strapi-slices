import {
  IStrapiData,
  IStrapiResponse,
  PortfolioProject,
  StrapiProject,
} from '../..';
import { STRAPI_DEFAULT_PAGE_SIZE } from '../../constants/strapi';
import FPMProject from '../../models/fpm/FPMProject';
import fpmClient from '../fpmClient';
import strapiClient from './strapiClient';

const FALLBACK_LOCALE = 'en';

const getPortfolioProjects = async (
  locale: string = 'en',
  preview: boolean = false
): Promise<PortfolioProject[]> => {
  const params: Record<string, any> = {
    populate: 'deep,6',
    locale,
    'pagination[pageSize]': STRAPI_DEFAULT_PAGE_SIZE,
  };

  if (preview) {
    params.publicationState = 'preview';
  }

  const [
    { data: fpmProjects },
    { data: strapiProjectsLocalized },
    { data: strapiProjectsEnglish },
  ] = await Promise.all([
    fpmClient.get<FPMProject[]>('/public/projects'),
    strapiClient.get<IStrapiResponse<IStrapiData<StrapiProject>[]>>(
      '/projects',
      {
        params,
      }
    ),
    strapiClient.get<IStrapiResponse<IStrapiData<StrapiProject>[]>>(
      '/projects',
      {
        params: { ...params, locale: FALLBACK_LOCALE },
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

  return fpmProjects.map((fpmProject: FPMProject) => {
    const strapiProject = strapiProjects.get(fpmProject.id);

    const toReturn: PortfolioProject = fpmProject;

    if (strapiProject?.attributes.slug) {
      toReturn.slug = strapiProject.attributes.slug;
    }
    if (strapiProject?.attributes.creditsAvailable) {
      toReturn.creditsAvailable = strapiProject?.attributes.creditsAvailable;
    }
    if (strapiProject?.attributes.thumbnail) {
      toReturn.thumbnail = strapiProject?.attributes.thumbnail;
    }
    if (strapiProject?.attributes.footerSubTitle) {
      toReturn.footerSubTitle = strapiProject?.attributes.footerSubTitle;
    }
    if (strapiProject?.attributes.portfolio.data?.attributes.host) {
      toReturn.portfolioHost =
        strapiProject.attributes.portfolio.data.attributes.host;
    }

    return toReturn;
  });
};

export default getPortfolioProjects;
