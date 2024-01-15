import StrapiProjectCard from '../../models/strapi/StrapiProjectCard';
import { strapiProjectMock } from './strapiProject';

export const strapiProjectCardMock: StrapiProjectCard = {
  id: 1,
  project: { data: strapiProjectMock },
};
