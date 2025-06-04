import { GetStaticPropsContext } from 'next';
import strapiMediaUrl from './strapiMediaUrl';
import {
  IStrapiData,
  StrapiCustomerStory,
  StrapiCustomerStoryProps,
  StrapiGlobal,
} from '..';
import { DEFAULT_SHARE_ALT, DEFAULT_SHARE_IMAGE } from '../constants/metadata';
import { SLICES_WITH_CUSTOMER_STORIES } from '../constants/slicesConfig';

const mergeGlobalAndStrapiCustomerStoryData = (
  context: GetStaticPropsContext,
  global: IStrapiData<StrapiGlobal>,
  customerStory: IStrapiData<StrapiCustomerStory>,
  customerStories: IStrapiData<StrapiCustomerStory>[]
): StrapiCustomerStoryProps => {
  const metaShareImageUrl = customerStory.attributes.metadata?.shareImage
    ? strapiMediaUrl(
        customerStory.attributes.metadata?.shareImage.media ??
          global.attributes.metadata.shareImage?.media,
        'large'
      )
    : DEFAULT_SHARE_IMAGE;

  const schemaMarkupTypes =
    customerStory.attributes.metadata?.schemaMarkupTypes ??
    global.attributes.metadata?.schemaMarkupTypes ??
    [];

  const returnCustomerStories = customerStory.attributes.slices.some((slice) =>
    SLICES_WITH_CUSTOMER_STORIES.includes(slice.__component)
  );

  return {
    ...customerStory,
    // Portfolio Projects
    projects: [],
    attributes: {
      ...customerStory?.attributes,
      metadata:
        customerStory?.attributes?.metadata || global.attributes.metadata,
    },
    // PageProps
    headerType: {
      extendable: true,
      theme: 'light',
    },
    headerNavMenus: global.attributes.navbar.navMenus || [],
    headerButtons: global.attributes.navbar.buttons || [],
    footerLinks: global.attributes.footer.links || [],
    metadata: {
      title:
        customerStory.attributes.metadata?.title ??
        global.attributes.metadata.title,
      description:
        customerStory.attributes.metadata?.description ??
        global.attributes.metadata.description,
      shareImage: {
        url: metaShareImageUrl,
        alt:
          customerStory.attributes.metadata?.shareImage?.alt ??
          global.attributes.metadata.shareImage?.alt ??
          DEFAULT_SHARE_ALT,
      },
      metaTitleSuffix: global.attributes.metaTitleSuffix,
      favicon: strapiMediaUrl(global.attributes.favicon, 'thumbnail'),
      schemaMarkupTypes,
    },
    slices: customerStory?.attributes.slices,
    customerStories: returnCustomerStories ? customerStories : [],
    banner: global.attributes.banner,
    topBanner:
      customerStory?.attributes.topBanner || global.attributes.topBanner,
    blogPosts: [],
    preview: !!context.preview,
    isFallbackLocale: context.locale !== customerStory.attributes.locale,
  };
};

export default mergeGlobalAndStrapiCustomerStoryData;
