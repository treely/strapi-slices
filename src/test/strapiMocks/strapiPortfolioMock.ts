import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiPortfolio from '../../models/strapi/StrapiPortfolio';

export const strapiPortfolioMock: IStrapiData<StrapiPortfolio> = {
  id: 1,
  attributes: {
    name: 'my-portfolio',
    title: 'My Portfolio',
    locale: 'en',
    createdAt: '2022-01-10T15:04:32.897Z',
    updatedAt: '2022-01-11T10:21:42.317Z',
    slices: [
      {
        __component: 'sections.rich-text',
        id: 6,
        content: '# This is my rich text!',
      },
    ],
  },
};
