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
} from '../constants/sectionsConfig';
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

  return {
    ...project,
    // Portfolio Projects
    projects,
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
    },
    slices: project.attributes.slices,
    blogPosts,
    banner: global.attributes.banner,
    topBanner: project?.attributes.topBanner || global.attributes.topBanner,
    customerStories: [],
  };
};

export default mergeGlobalAndStrapiProject;
