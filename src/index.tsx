import IStrapi from './models/strapi/IStrapi';
import IStrapiData from './models/strapi/IStrapiData';
import IStrapiResponse from './models/strapi/IStrapiResponse';
import StrapiAuthor from './models/strapi/StrapiAuthor';
import StrapiAvatarWithName from './models/strapi/StrapiAvatarWithName';
import StrapiBanner from './models/strapi/StrapiBanner';
import StrapiBlogPost from './models/strapi/StrapiBlogPost';
import StrapiBlogPostProps from './models/strapi/StrapiBlogPostProps';
import StrapiButtonWithVariant from './models/strapi/StrapiButtonWithVariant';
import StrapiCategory from './models/strapi/StrapiCategory';
import StrapiContactArea from './models/strapi/StrapiContactArea';
import StrapiCustomerStory from './models/strapi/StrapiCustomerStory';
import StrapiCustomerStoryProps from './models/strapi/StrapiCustomerStoryProps';
import StrapiDefaultHeader from './models/strapi/StrapiDefaultHeader';
import StrapiEvent from './models/strapi/StrapiEvent';
import StrapiGlobal from './models/strapi/StrapiGlobal';
import StrapiGlossaryItem from './models/strapi/StrapiGlossaryItem';
import StrapiHeroCard from './models/strapi/StrapiHeroCard';
import StrapiImage from './models/strapi/StrapiImage';
import StrapiImageFormat from './models/strapi/StrapiImageFormat';
import StrapiImageWithLink from './models/strapi/StrapiImageWithLink';
import StrapiLink from './models/strapi/StrapiLink';
import StrapiLinkList from './models/strapi/StrapiLinkList';
import StrapiLinkPage from './models/strapi/StrapiLinkPage';
import StrapiLinkWithIcon from './models/strapi/StrapiLinkWithIcon';
import StrapiLocalization from './models/strapi/StrapiLocalization';
import StrapiMedia from './models/strapi/StrapiMedia';
import StrapiMetadata from './models/strapi/StrapiMetadata';
import StrapiNavMenu from './models/strapi/StrapiNavMenu';
import StrapiPage from './models/strapi/StrapiPage';
import StrapiPageProps from './models/strapi/StrapiPageProps';
import StrapiPortfolio from './models/strapi/StrapiPortfolio';
import StrapiPortfolioCard from './models/strapi/StrapiPortfolioCard';
import StrapiProject from './models/strapi/StrapiProject';
import StrapiProjectCard from './models/strapi/StrapiProjectCard';
import StrapiProjectProps from './models/strapi/StrapiProjectProps';
import StrapiQuoteCard from './models/strapi/StrapiQuoteCard';
import StrapiShapesCard from './models/strapi/StrapiShapesCard';
import StrapiTextCardWithIcons from './models/strapi/StrapiTextCardWithIcons';
import StrapiTopBanner from './models/strapi/StrapiTopBanner';

import HeaderType from './models/HeaderType';
import Image from './models/Image';
import Locale from './models/Locale';
import PageMetadata from './models/PageMetadata';
import PageProps from './models/PageProps';
import PortfolioProject from './models/PortfolioProject';

import FontsCustomization from './constants/fontCustomizations';

import getAllSlugsFromStrapi from './integrations/strapi/getAllSlugsFromStrapi';
import getPortfolioProjects from './integrations/strapi/getPortfolioProjects';
import getStrapiCollectionType from './integrations/strapi/getStrapiCollectionType';
import getStrapiSingleType from './integrations/strapi/getStrapiSingleType';

import mergeGlobalAndStrapiBlogPostData from './utils/mergeGlobalAndStrapiBlogPostData';
import mergeGlobalAndStrapiCustomerStoryData from './utils/mergeGlobalAndStrapiCustomerStoryData';
import mergeGlobalAndStrapiPageData from './utils/mergeGlobalAndStrapiPageData';
import mergeGlobalAndStrapiProjectData from './utils/mergeGlobalAndStrapiProjectData';
import strapiLinkUrl from './utils/strapiLinkUrl';
import strapiMediaUrl from './utils/strapiMediaUrl';

export { PreviewAlert } from './components/PreviewAlert';
export { SEOTags } from './components/SEOTags';
export { SliceRenderer } from './components/SliceRenderer';

export {
  // Utils
  mergeGlobalAndStrapiBlogPostData,
  mergeGlobalAndStrapiCustomerStoryData,
  mergeGlobalAndStrapiPageData,
  mergeGlobalAndStrapiProjectData,
  strapiLinkUrl,
  strapiMediaUrl,

  // Integrations
  getAllSlugsFromStrapi,
  getPortfolioProjects,
  getStrapiCollectionType,
  getStrapiSingleType,
};

export type {
  // Strapi Models
  IStrapi,
  IStrapiData,
  IStrapiResponse,
  StrapiAuthor,
  StrapiAvatarWithName,
  StrapiBanner,
  StrapiBlogPost,
  StrapiBlogPostProps,
  StrapiButtonWithVariant,
  StrapiCategory,
  StrapiContactArea,
  StrapiCustomerStory,
  StrapiCustomerStoryProps,
  StrapiDefaultHeader,
  StrapiEvent,
  StrapiGlobal,
  StrapiGlossaryItem,
  StrapiHeroCard,
  StrapiImage,
  StrapiImageFormat,
  StrapiImageWithLink,
  StrapiLink,
  StrapiLinkList,
  StrapiLinkPage,
  StrapiLinkWithIcon,
  StrapiLocalization,
  StrapiMedia,
  StrapiMetadata,
  StrapiNavMenu,
  StrapiPage,
  StrapiPageProps,
  StrapiPortfolio,
  StrapiPortfolioCard,
  StrapiProject,
  StrapiProjectCard,
  StrapiProjectProps,
  StrapiQuoteCard,
  StrapiShapesCard,
  StrapiTextCardWithIcons,
  StrapiTopBanner,

  // Models
  HeaderType,
  Image,
  Locale,
  PageMetadata,
  PageProps,
  PortfolioProject,

  // Constants
  FontsCustomization,
};
