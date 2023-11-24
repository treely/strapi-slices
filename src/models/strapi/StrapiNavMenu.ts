import StrapiImage from './StrapiImage';
import StrapiLink from './StrapiLink';

interface StrapiNavMenu {
  title: string;
  link?: StrapiLink;

  items: {
    link: StrapiLink;
    iconDefault: StrapiImage;
    iconActive: StrapiImage;
    description?: string;
  }[];
}

export default StrapiNavMenu;
