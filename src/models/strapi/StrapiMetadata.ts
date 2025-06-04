import IStrapi from './IStrapi';
import IStrapiData from './IStrapiData';
import StrapiMedia from './StrapiMedia';

interface StrapiMetadata {
  title: string;
  description: string;
  schemaMarkupTypes?: string[];
  shareImage?: {
    id: number;
    alt: string;
    media: IStrapi<IStrapiData<StrapiMedia>>;
  };
}

export default StrapiMetadata;
