import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiGlobal from '../../models/strapi/StrapiGlobal';
import { strapiMediaMock } from './strapiMedia';
import { strapiMetadataMock } from './strapiMetadata';

const minimalGlobalData: IStrapiData<StrapiGlobal> = {
  id: 1,
  attributes: {
    locale: 'en',
    metadata: strapiMetadataMock,
    favicon: { data: strapiMediaMock },
    metaTitleSuffix: 'Meta title suffix',
    navbar: {
      id: 1,
      navMenus: undefined,
      buttons: undefined,
    },
    footer: {
      id: 1,
      links: undefined,
    },
  },
};

export default minimalGlobalData;
