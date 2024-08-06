import Locale from '../Locale';
import IStrapi from './IStrapi';
import IStrapiData from './IStrapiData';
import StrapiImage from './StrapiImage';
import StrapiLocalization from './StrapiLocalization';
import StrapiMetadata from './StrapiMetadata';
import StrapiPortfolio from './StrapiPortfolio';
import StrapiTopBanner from './StrapiTopBanner';

interface StrapiProject {
  slug: string;
  locale: Locale;
  fpmProjectId?: string;
  footerSubTitle?: string;
  createdAt: string;
  updatedAt: string;
  metadata: StrapiMetadata | null;
  thumbnail: StrapiImage | null;
  slices: any[];
  localizations: StrapiLocalization[];
  portfolio: IStrapi<IStrapiData<StrapiPortfolio> | null>;
  topBanner?: StrapiTopBanner;
}

export default StrapiProject;
