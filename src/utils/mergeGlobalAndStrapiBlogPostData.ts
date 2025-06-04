import { GetStaticPropsContext } from 'next';
import strapiMediaUrl from './strapiMediaUrl';
import {
  IStrapiData,
  StrapiBlogPost,
  StrapiBlogPostProps,
  StrapiGlobal,
} from '..';
import PortfolioProject from '../models/PortfolioProject';
import { DEFAULT_SHARE_ALT, DEFAULT_SHARE_IMAGE } from '../constants/metadata';
import {
  SLICES_WITH_BLOG_POSTS,
  SLICES_WITH_PROJECTS,
} from '../constants/slicesConfig';

const mergeGlobalAndStrapiBlogPostData = (
  context: GetStaticPropsContext,
  global: IStrapiData<StrapiGlobal>,
  post: IStrapiData<StrapiBlogPost>,
  blog: IStrapiData<StrapiBlogPost>[],
  projects: PortfolioProject[]
): StrapiBlogPostProps => {
  const metaShareImageUrl = post.attributes.metadata?.shareImage
    ? strapiMediaUrl(
        post.attributes.metadata?.shareImage.media ??
          global.attributes.metadata.shareImage?.media,
        'large'
      )
    : DEFAULT_SHARE_IMAGE;

  const schemaMarkupTypes =
    post.attributes.metadata?.schemaMarkupTypes ??
    global.attributes.metadata?.schemaMarkupTypes ??
    [];

  const returnBlog = post.attributes.slices.some((slice) =>
    SLICES_WITH_BLOG_POSTS.includes(slice.__component)
  );
  const returnProjects = post.attributes.slices.some((slice) =>
    SLICES_WITH_PROJECTS.includes(slice.__component)
  );

  return {
    ...post,
    // Portfolio Projects
    projects: returnProjects ? projects : [],
    // StrapiBlogPost
    attributes: {
      ...post?.attributes,
      metadata: post?.attributes?.metadata || global.attributes.metadata,
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
        post.attributes.metadata?.title ?? global.attributes.metadata.title,
      description:
        post.attributes.metadata?.description ??
        global.attributes.metadata.description,
      shareImage: {
        url: metaShareImageUrl,
        alt:
          post.attributes.metadata?.shareImage?.alt ??
          global.attributes.metadata.shareImage?.alt ??
          DEFAULT_SHARE_ALT,
      },
      metaTitleSuffix: global.attributes.metaTitleSuffix,
      favicon: strapiMediaUrl(global.attributes.favicon, 'thumbnail'),
      schemaMarkupTypes,
    },
    slices: post?.attributes.slices,
    blogPosts: returnBlog ? blog : [],
    banner: global.attributes.banner,
    topBanner: post?.attributes.topBanner || global.attributes.topBanner,
    customerStories: [],
    preview: !!context.preview,
    isFallbackLocale: context.locale !== post.attributes.locale,
  };
};

export default mergeGlobalAndStrapiBlogPostData;
