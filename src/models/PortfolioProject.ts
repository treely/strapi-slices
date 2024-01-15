import { StrapiImage } from '..';
import CreditsAvailableState from './CreditsAvailableState';
import FPMProject from './fpm/FPMProject';

interface PortfolioProject extends FPMProject {
  slug?: string;
  thumbnail?: StrapiImage | null;
  creditsAvailable?: CreditsAvailableState;
  footerSubTitle?: string;
}

export default PortfolioProject;
