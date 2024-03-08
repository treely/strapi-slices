import StrapiImage from './StrapiImage';
import StrapiLink from './StrapiLink';

interface StrapiHeroCard {
  id: number;
  title: string;
  subTitle: string;
  button?: StrapiLink;
  image?: StrapiImage;
}

export default StrapiHeroCard;
