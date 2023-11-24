import StrapiMetadata from '@/models/strapi/StrapiMetadata';
import { strapiMediaMock } from './strapiMedia';

export const strapiMetadataMock: StrapiMetadata = {
  title: 'Tree.ly',
  description: 'Tree.ly description',
  shareImage: {
    id: 1,
    alt: 'Share image',
    media: { data: strapiMediaMock },
  },
};
