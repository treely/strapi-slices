import StrapiContactArea from '@/models/strapi/StrapiContactArea';
import { strapiAvatarWithNameMock } from './strapiAvatarWithName';
import { strapiLinkPageMock } from './strapiLinkPage';

export const strapiContactMock: StrapiContactArea = {
  id: 1,
  title: 'Title',
  text: 'Text',
  avatar: strapiAvatarWithNameMock,
  button: {
    id: 1,
    text: 'Button text',
    page: { data: strapiLinkPageMock },
  },
};
