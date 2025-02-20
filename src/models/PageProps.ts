import {
  IStrapiData,
  StrapiBanner,
  StrapiBlogPost,
  StrapiCustomerStory,
  StrapiEvent,
  StrapiLink,
  StrapiLinkList,
  StrapiNavMenu,
  StrapiTopBanner,
} from '..';
import { ReactNode } from 'react';
import PortfolioProject from './PortfolioProject';
import PageMetadata from './PageMetadata';
import HeaderType from './HeaderType';

interface PageProps {
  headerType?: HeaderType;
  headerNavMenus?: StrapiNavMenu[];
  headerButtons?: StrapiLink[];
  footerLinks?: StrapiLinkList[];
  hideFooter?: boolean;
  children?: ReactNode;
  metadata: PageMetadata;
  slices: any[];
  blogPosts: IStrapiData<StrapiBlogPost>[];
  projects: PortfolioProject[];
  events: StrapiEvent[];
  banner?: StrapiBanner;
  topBanner?: StrapiTopBanner;
  customerStories: IStrapiData<StrapiCustomerStory>[];
  preview: boolean;
  isFallbackLocale: boolean;
}

export default PageProps;
