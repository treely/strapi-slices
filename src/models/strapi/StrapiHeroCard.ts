import StrapiImage from './StrapiImage';

interface StrapiHeroCard {
  id: number;
  title: string;
  subTitle: string;
  button?: {
    id: number;
    url: string;
    text: string;
  };
  image?: StrapiImage;
}

export default StrapiHeroCard;
