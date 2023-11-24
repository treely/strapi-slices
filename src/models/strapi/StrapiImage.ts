import IStrapi from './IStrapi';
import IStrapiData from './IStrapiData';
import StrapiMedia from './StrapiMedia';

interface StrapiImage {
  id: number;
  alt: string;
  img: IStrapi<IStrapiData<StrapiMedia>>;
  objectFit?: 'cover' | 'contain';
}

export default StrapiImage;
