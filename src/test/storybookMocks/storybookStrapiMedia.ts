import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiMedia from '../../models/strapi/StrapiMedia';
import { strapiMediaMock } from '../strapiMocks/strapiMedia';
import { storybookAvatarUrl } from './storybookMedia';

export const storybookStrapiAvatarMock: IStrapiData<StrapiMedia> = {
  ...strapiMediaMock,
  attributes: {
    ...strapiMediaMock.attributes,
    formats: {},
    url: storybookAvatarUrl,
  },
};

export const storybookStrapiCoverMock: IStrapiData<StrapiMedia> = {
  ...strapiMediaMock,
  attributes: {
    ...strapiMediaMock.attributes,
    formats: {},
    url: 'https://cdn.tree.ly/storybook/v1/cover.jpeg',
  },
};

export const storybookStrapiGradientTopDownMock: IStrapiData<StrapiMedia> = {
  ...strapiMediaMock,
  attributes: {
    ...strapiMediaMock.attributes,
    formats: {},
    url: 'https://cdn.tree.ly/storybook/v1/shape_gradient_top_down.png',
  },
};

export const storybookStrapiGradientBottomUpMock: IStrapiData<StrapiMedia> = {
  ...strapiMediaMock,
  attributes: {
    ...strapiMediaMock.attributes,
    formats: {},
    url: 'https://cdn.tree.ly/storybook/v1/shape_gradient_buttom_up.png',
  },
};

export const storybookStrapiTreeIconMock: IStrapiData<StrapiMedia> = {
  ...strapiMediaMock,
  attributes: {
    ...strapiMediaMock.attributes,
    formats: {},
    url: 'https://cdn.tree.ly/storybook/v1/icon_tree.png',
  },
};

export const storybookStrapiMapMock: IStrapiData<StrapiMedia> = {
  ...strapiMediaMock,
  attributes: {
    ...strapiMediaMock.attributes,
    formats: {},
    url: 'https://cdn.tree.ly/storybook/v1/map.jpeg',
  },
};
