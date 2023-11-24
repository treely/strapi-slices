import StrapiImage from './StrapiImage';
import StrapiLink from './StrapiLink';

interface StrapiPortfolioCard {
  id: number;
  portfolioNumber: string;
  title: string;
  facts: {
    id: number;
    key: string;
    value: string;
  }[];
  button: StrapiLink;
  image: StrapiImage;
}

export default StrapiPortfolioCard;
