import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiLinkPage from '../../models/strapi/StrapiLinkPage';

export const strapiLinkPageMock: IStrapiData<StrapiLinkPage> = {
  id: 1,
  attributes: {
    title: 'Page title',
    slug: 'page-slug',
    locale: 'en',
    publishedAt: '2021-08-25T09:52:59.012Z',
    createdAt: '2021-08-25T09:52:28.702Z',
    updatedAt: '2021-08-30T14:18:49.238Z',
  },
};
