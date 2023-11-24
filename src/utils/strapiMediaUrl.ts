import { STRAPI_URI } from '@/constants/strapi';
import IStrapi from '@/models/strapi/IStrapi';
import IStrapiData from '@/models/strapi/IStrapiData';
import StrapiMedia from '@/models/strapi/StrapiMedia';

const strapiMediaUrl = (
  media: IStrapi<IStrapiData<StrapiMedia>>,
  preferredSize:
    | 'native'
    | 'thumbnail'
    | 'xSmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xLarge' = 'native'
): string => {
  let { url } = media.data.attributes || {};
  if (preferredSize !== 'native' && media.data.attributes.ext !== '.svg') {
    url = media.data.attributes.formats[preferredSize]?.url || url;
  }
  if (url && (url.indexOf('http://') === 0 || url.indexOf('https://') === 0)) {
    return url;
  }
  return `${
    (STRAPI_URI.includes('127.0.0.1') || STRAPI_URI.includes('localhost')) &&
    !process.env.STORYBOOK
      ? STRAPI_URI
      : ''
  }${url}`;
};

export default strapiMediaUrl;
