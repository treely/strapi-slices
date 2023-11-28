import StrapiLink from '../models/strapi/StrapiLink';

const strapiLinkUrl = (
  strapiLink: StrapiLink | undefined = undefined
): string => {
  if (strapiLink?.page?.data) {
    return `/${strapiLink.page.data.attributes.slug}`;
  }

  return strapiLink?.url || '/';
};

export default strapiLinkUrl;
