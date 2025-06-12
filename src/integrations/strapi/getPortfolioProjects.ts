import { PortfolioProject } from '../..';
import { STRAPI_DEFAULT_POPULATE_DEPTH } from '../../constants/strapi';
import FPMProject from '../../models/fpm/FPMProject';
import fpmClient from '../fpmClient';
import getStrapiProjects from './getStrapiProjects';

const getPortfolioProjects = async (
  locale: string = 'en',
  preview: boolean = false
): Promise<PortfolioProject[]> => {
  const cache = preview ? false : undefined;

  const [{ data: fpmProjects }, strapiProjects] = await Promise.all([
    fpmClient.get<FPMProject[]>('/public/projects', { cache }),
    getStrapiProjects(locale, STRAPI_DEFAULT_POPULATE_DEPTH, preview),
  ]);

  return fpmProjects.map((fpmProject: FPMProject) => {
    const strapiProject = strapiProjects.get(fpmProject.id);

    const toReturn: PortfolioProject = fpmProject;

    if (strapiProject?.attributes.slug) {
      toReturn.slug = strapiProject.attributes.slug;
    }
    if (strapiProject?.attributes.thumbnail) {
      toReturn.thumbnail = strapiProject?.attributes.thumbnail;
    }
    if (strapiProject?.attributes.portfolio.data?.attributes.host) {
      toReturn.portfolioHost =
        strapiProject.attributes.portfolio.data.attributes.host;
    }

    return toReturn;
  });
};

export default getPortfolioProjects;
