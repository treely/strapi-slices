import StrapiImage from './StrapiImage';
import StrapiLink from './StrapiLink';

interface StrapiShapesCard {
  id: number;
  tagline?: string;
  title: string;
  text?: string;
  button?: StrapiLink;
  shapes?: StrapiImage[];
}

export default StrapiShapesCard;
