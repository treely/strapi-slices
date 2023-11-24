import { strapiMediaMock } from './strapiMedia';

export const strapiAvatarWithNameMock = {
  id: 1,
  name: 'Name',
  description: 'Description',
  image: {
    id: 1,
    alt: 'Alternative image',
    img: { data: strapiMediaMock },
  },
};
