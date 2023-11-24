import CreditsAvailableState from '../CreditsAvailableState';
import Locale from '../Locale';
import IStrapiData from './IStrapiData';
import StrapiLocalization from './StrapiLocalization';
import StrapiMetadata from './StrapiMetadata';
import StrapiPortfolio from './StrapiPortfolio';
import StrapiTopBanner from './StrapiTopBanner';

interface StrapiProject {
  slug: string;
  locale: Locale;
  fpmProjectId?: string;
  creditsAvailable?: CreditsAvailableState;
  createdAt: string;
  updatedAt: string;
  metadata: StrapiMetadata | null;
  slices: any[];
  localizations: StrapiLocalization[];
  portfolio: {
    data?: IStrapiData<StrapiPortfolio>;
  };
  topBanner?: StrapiTopBanner;
}

export default StrapiProject;
