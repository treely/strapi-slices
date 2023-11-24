import StrapiImage from './StrapiImage';
import StrapiLink from './StrapiLink';

interface StrapiImageWithLink extends StrapiImage {
  link?: StrapiLink;
}

export default StrapiImageWithLink;
