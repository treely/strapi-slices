import Locale from '../Locale';
import IStrapi from './IStrapi';
import IStrapiData from './IStrapiData';
import StrapiBanner from './StrapiBanner';
import StrapiLink from './StrapiLink';
import StrapiLinkList from './StrapiLinkList';
import StrapiMedia from './StrapiMedia';
import StrapiMetadata from './StrapiMetadata';
import StrapiNavMenu from './StrapiNavMenu';
import StrapiTopBanner from './StrapiTopBanner';

interface StrapiGlobal {
  locale: Locale;
  metadata: StrapiMetadata;
  favicon: IStrapi<IStrapiData<StrapiMedia>>;
  metaTitleSuffix: string;
  navbar: {
    id: number;
    navMenus?: StrapiNavMenu[];
    buttons?: StrapiLink[];
  };
  footer: {
    id: number;
    links?: StrapiLinkList[];
  };
  banner?: StrapiBanner;
  topBanner?: StrapiTopBanner;
}

export default StrapiGlobal;
