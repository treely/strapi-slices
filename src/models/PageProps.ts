import {
  IStrapiData,
  StrapiBanner,
  StrapiBlogPost,
  StrapiCustomerStory,
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
  banner?: StrapiBanner;
  topBanner?: StrapiTopBanner;
  customerStories: IStrapiData<StrapiCustomerStory>[];
  preview: boolean;
}

export default PageProps;
