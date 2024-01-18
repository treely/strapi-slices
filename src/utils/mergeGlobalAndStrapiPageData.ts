import { GetStaticPropsContext } from 'next';
import strapiMediaUrl from './strapiMediaUrl';
import {
  IStrapiData,
  StrapiBlogPost,
  StrapiCustomerStory,
  StrapiGlobal,
  StrapiPage,
  StrapiPageProps,
} from '..';
import PortfolioProject from '../models/PortfolioProject';
import {
  DARK_THEME_HEADER_SECTIONS,
  EXTENDABLE_HEADER_SECTIONS,
  SLICES_WITH_BLOG_POSTS,
  SLICES_WITH_CUSTOMER_STORIES,
  SLICES_WITH_PROJECTS,
} from '../constants/slicesConfig';
import { DEFAULT_SHARE_ALT, DEFAULT_SHARE_IMAGE } from '../constants/metadata';

const mergeGlobalAndStrapiPageData = (
  context: GetStaticPropsContext,
  global: IStrapiData<StrapiGlobal>,
  page: IStrapiData<StrapiPage>,
  blogPosts: IStrapiData<StrapiBlogPost>[],
  customerStories: IStrapiData<StrapiCustomerStory>[],
  projects: PortfolioProject[]
): StrapiPageProps => {
  const metaShareImageUrl = page.attributes.metadata?.shareImage
    ? strapiMediaUrl(
        page.attributes.metadata?.shareImage.media ??
          global.attributes.metadata.shareImage?.media,
        'large'
      )
    : DEFAULT_SHARE_IMAGE;

  const returnBlogPosts = page.attributes.slices.some((slice) =>
    SLICES_WITH_BLOG_POSTS.includes(slice.__component)
  );
  const returnCustomerStories = page.attributes.slices.some((slice) =>
    SLICES_WITH_CUSTOMER_STORIES.includes(slice.__component)
  );
  const returnProjects = page.attributes.slices.some((slice) =>
    SLICES_WITH_PROJECTS.includes(slice.__component)
  );

  return {
    ...page,
    // Portfolio Projects
    projects: returnProjects ? projects : [],
    // StrapiPage
    attributes: {
      ...page?.attributes,
      metadata: page?.attributes?.metadata ?? global.attributes.metadata,
    },
    // PageProps
    headerType: {
      extendable: EXTENDABLE_HEADER_SECTIONS.includes(
        page.attributes.slices[0]?.__component
      ),
      theme: DARK_THEME_HEADER_SECTIONS.includes(
        page.attributes.slices[0]?.__component
      )
        ? 'dark'
        : 'light',
    },
    headerNavMenus: global.attributes.navbar.navMenus || [],
    headerButtons: global.attributes.navbar.buttons || [],
    footerLinks: global.attributes.footer.links || [],
    metadata: {
      title:
        page.attributes.metadata?.title ?? global.attributes.metadata.title,
      description:
        page.attributes.metadata?.description ??
        global.attributes.metadata.description,
      shareImage: {
        url: metaShareImageUrl,
        alt:
          page.attributes.metadata?.shareImage?.alt ??
          global.attributes.metadata.shareImage?.alt ??
          DEFAULT_SHARE_ALT,
      },
      metaTitleSuffix: global.attributes.metaTitleSuffix,
      favicon: strapiMediaUrl(global.attributes.favicon, 'thumbnail'),
    },
    slices: page?.attributes.slices,
    blogPosts: returnBlogPosts ? blogPosts : [],
    banner: global.attributes.banner,
    topBanner: page?.attributes.topBanner || global.attributes.topBanner,
    customerStories: returnCustomerStories ? customerStories : [],
  };
};

export default mergeGlobalAndStrapiPageData;
