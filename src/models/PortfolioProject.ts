import CreditsAvailableState from './CreditsAvailableState';
import FPMProject from './fpm/FPMProject';

interface PortfolioProject extends FPMProject {
  slug?: string;
  creditsAvailable?: CreditsAvailableState;
}

export default PortfolioProject;
