import { StrapiImage } from '..';
import FPMProject from './fpm/FPMProject';

interface PortfolioProject extends FPMProject {
  /** Remember to prefix the slug with portfolioHost */
  slug?: string;
  portfolioHost?: string;
  thumbnail?: StrapiImage | null;
}

export default PortfolioProject;
