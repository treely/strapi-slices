import Locale from '../Locale';
import StrapiImage from './StrapiImage';

interface StrapiAuthor {
  name: string;
  locale: Locale;
  createdAt: string;
  updatedAt: string;
  img: StrapiImage;
}

export default StrapiAuthor;
