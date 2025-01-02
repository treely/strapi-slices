import { GetStaticPropsContext } from 'next';
import strapiMediaUrl from './strapiMediaUrl';
import { IStrapiData, StrapiEvent, StrapiGlobal } from '..';
import { DEFAULT_SHARE_ALT, DEFAULT_SHARE_IMAGE } from '../constants/metadata';
import { SLICES_WITH_EVENTS } from '../constants/slicesConfig';

const mergeGlobalAndStrapiEventData = (
  context: GetStaticPropsContext,
  global: IStrapiData<StrapiGlobal>,
  event: IStrapiData<StrapiEvent>,
  events: IStrapiData<StrapiEvent>[]
): StrapiEventProps => {
  const metaShareImageUrl = event.attributes.metadata?.shareImage
    ? strapiMediaUrl(
        event.attributes.metadata?.shareImage.media ??
          global.attributes.metadata.shareImage?.media,
        'large'
      )
    : DEFAULT_SHARE_IMAGE;

  const returnEvents = event.attributes.slices.some((slice: any) =>
    SLICES_WITH_EVENTS.includes(slice.__component)
  );

  return {
    ...event,
    // Portfolio Projects
    projects: [],
    attributes: {
      ...event?.attributes,
      metadata: event?.attributes?.metadata || global.attributes.metadata,
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
        event.attributes.metadata?.title ?? global.attributes.metadata.title,
      description:
        event.attributes.metadata?.description ??
        global.attributes.metadata.description,
      shareImage: {
        url: metaShareImageUrl,
        alt:
          event.attributes.metadata?.shareImage?.alt ??
          global.attributes.metadata.shareImage?.alt ??
          DEFAULT_SHARE_ALT,
      },
      metaTitleSuffix: global.attributes.metaTitleSuffix,
      favicon: strapiMediaUrl(global.attributes.favicon, 'thumbnail'),
    },
    slices: event?.attributes.slices,
    events: returnEvents ? events : [],
    banner: global.attributes.banner,
    topBanner: event?.attributes.topBanner || global.attributes.topBanner,
    blogPosts: [],
    preview: !!context.preview,
    isFallbackLocale: context.locale !== event.attributes.locale,
  };
};

export default mergeGlobalAndStrapiEventData;
