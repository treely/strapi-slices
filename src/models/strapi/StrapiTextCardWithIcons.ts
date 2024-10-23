import StrapiImage from './StrapiImage';
import StrapiLink from './StrapiLink';

interface StrapiTextCardWithIcon {
  id: number;
  title: string;
  text: string;
  icon: StrapiImage;
  button?: StrapiLink;
  image?: StrapiImage;
}

export default StrapiTextCardWithIcon;
