import IStrapiData from './IStrapiData';
import StrapiImage from './StrapiImage';
import StrapiProject from './StrapiProject';

interface StrapiProjectCard {
  id: number;
  title: string;
  footerTitle: string;
  footerSubTitle: string;
  image: StrapiImage;
  project?: {
    data?: IStrapiData<StrapiProject>;
  };
}

export default StrapiProjectCard;
