import { StrapiImage } from '..';
import CreditsAvailableState from './CreditsAvailableState';
import FPMProject from './fpm/FPMProject';

interface PortfolioProject extends FPMProject {
  /** Remember to prefix the slug with portfolioHost */
  slug?: string;
  portfolioHost?: string;
  thumbnail?: StrapiImage | null;
  creditsAvailable?: CreditsAvailableState;
  footerSubTitle?: string;
}

export default PortfolioProject;
