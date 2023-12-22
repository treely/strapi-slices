import StrapiProjectCard from '../../models/strapi/StrapiProjectCard';
import { strapiMediaMock } from './strapiMedia';
import { strapiProjectMock } from './strapiProject';

export const strapiProjectCardMock: StrapiProjectCard = {
  id: 1,
  title: 'My forest',
  footerTitle: 'Footer title',
  footerSubTitle: 'Footer sub title',
  image: {
    id: 1,
    alt: 'Alt text',
    img: { data: strapiMediaMock },
  },
  project: { data: strapiProjectMock },
};
