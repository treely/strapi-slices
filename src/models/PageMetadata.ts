import Image from './Image';

interface PageMetadata {
  title: string;
  description: string;
  shareImage?: Image;
  metaTitleSuffix?: string;
  favicon?: string;
}

export default PageMetadata;
