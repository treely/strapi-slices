import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiProject from '../../models/strapi/StrapiProject';
import { strapiPortfolioMock } from './strapiPortfolioMock';
import fpmProjectMock from '../integrationMocks/fpmProjectMock';
import { strapiMediaMock } from './strapiMedia';

export const strapiProjectMock: IStrapiData<StrapiProject> = {
  id: 1,
  attributes: {
    slug: 'slug',
    locale: 'en',
    fpmProjectId: fpmProjectMock.id,
    footerSubTitle: 'Certified, 2023',
    createdAt: '2022-01-10T15:04:32.897Z',
    updatedAt: '2022-01-11T10:21:42.317Z',
    metadata: null,
    slices: [
      {
        __component: 'sections.rich-text',
        id: 6,
        content: '# This is my rich text!',
      },
    ],
    portfolio: {
      data: strapiPortfolioMock,
    },
    thumbnail: {
      img: { data: strapiMediaMock },
      alt: 'Project Thumbnail',
      id: 1,
    },
    localizations: [
      {
        id: 2,
        locale: 'de',
      },
    ],
  },
};
