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

  return Promise.all(
    fpmProjects.map(async (fpmProject: FPMProject) => {
      // fetch the averageSellableAmountPerYear for each project
      try {
        const fpmProjectWithAverageSellableAmountPerYear =
          await fpmClient.get<FPMProject>(`/public/projects/${fpmProject.id}`, {
            cache,
          });

        fpmProject.averageSellableAmountPerYear =
          fpmProjectWithAverageSellableAmountPerYear.data.averageSellableAmountPerYear;
        // Handle 404 errors for private projects
      } catch (error: any) {
        if (error.response?.status === 404) {
          fpmProject.averageSellableAmountPerYear = 0;
        } else {
          // Re-throw other errors
          throw error;
        }
      }

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
    })
  );
};

export default getPortfolioProjects;
