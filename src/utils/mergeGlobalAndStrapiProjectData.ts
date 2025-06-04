import { GetStaticPropsContext } from 'next';
import strapiMediaUrl from './strapiMediaUrl';
import {
  IStrapiData,
  StrapiBlogPost,
  StrapiGlobal,
  StrapiProject,
  StrapiProjectProps,
} from '..';
import PortfolioProject from '../models/PortfolioProject';
import {
  DARK_THEME_HEADER_SECTIONS,
  EXTENDABLE_HEADER_SECTIONS,
  SLICES_WITH_BLOG_POSTS,
  SLICES_WITH_PROJECTS,
} from '../constants/slicesConfig';
import { DEFAULT_SHARE_ALT, DEFAULT_SHARE_IMAGE } from '../constants/metadata';

const mergeGlobalAndStrapiProject = (
  context: GetStaticPropsContext,
  global: IStrapiData<StrapiGlobal>,
  project: IStrapiData<StrapiProject>,
  blogPosts: IStrapiData<StrapiBlogPost>[],
  projects: PortfolioProject[]
): StrapiProjectProps => {
  const metaShareImageUrl = project.attributes.metadata?.shareImage
    ? strapiMediaUrl(
        project.attributes.metadata?.shareImage.media ??
          global.attributes.metadata.shareImage?.media,
        'large'
      )
    : DEFAULT_SHARE_IMAGE;

  const schemaMarkupTypes =
    project.attributes.metadata?.schemaMarkupTypes ??
    global.attributes.metadata?.schemaMarkupTypes ??
    [];

  const returnBlogPosts = project.attributes.slices.some((slice) =>
    SLICES_WITH_BLOG_POSTS.includes(slice.__component)
  );
  const returnProjects = project.attributes.slices.some((slice) =>
    SLICES_WITH_PROJECTS.includes(slice.__component)
  );

  return {
    ...project,
    // Portfolio Projects
    projects: returnProjects ? projects : [],
    // StrapiProject
    attributes: {
      ...project.attributes,
      metadata: project?.attributes?.metadata || global.attributes.metadata,
    },
    headerType: {
      extendable: EXTENDABLE_HEADER_SECTIONS.includes(
        project.attributes.slices[0]?.__component
      ),
      theme: DARK_THEME_HEADER_SECTIONS.includes(
        project.attributes.slices[0]?.__component
      )
        ? 'dark'
        : 'light',
    },
    // PageProps
    headerNavMenus: global.attributes.navbar.navMenus || [],
    headerButtons: global.attributes.navbar.buttons || [],
    footerLinks: global.attributes.footer.links || [],
    metadata: {
      title:
        project.attributes.metadata?.title ?? global.attributes.metadata.title,
      description:
        project.attributes.metadata?.description ??
        global.attributes.metadata.description,
      shareImage: {
        url: metaShareImageUrl,
        alt:
          project.attributes.metadata?.shareImage?.alt ??
          global.attributes.metadata.shareImage?.alt ??
          DEFAULT_SHARE_ALT,
      },
      metaTitleSuffix: global.attributes.metaTitleSuffix,
      favicon: strapiMediaUrl(global.attributes.favicon, 'thumbnail'),
      schemaMarkupTypes,
    },
    slices: project.attributes.slices,
    blogPosts: returnBlogPosts ? blogPosts : [],
    banner: global.attributes.banner,
    topBanner: project?.attributes.topBanner || global.attributes.topBanner,
    customerStories: [],
    preview: !!context.preview,
    isFallbackLocale: context.locale !== project.attributes.locale,
  };
};

export default mergeGlobalAndStrapiProject;
