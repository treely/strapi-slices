import Locale from '../Locale';
import IStrapi from './IStrapi';
import IStrapiData from './IStrapiData';
import StrapiAuthor from './StrapiAuthor';
import StrapiCategory from './StrapiCategory';
import StrapiImage from './StrapiImage';
import StrapiLocalization from './StrapiLocalization';
import StrapiMetadata from './StrapiMetadata';
import StrapiTopBanner from './StrapiTopBanner';

interface StrapiBlogPost {
  title: string;
  slug: string;
  teaser: string | null;
  img: StrapiImage;
  author?: IStrapi<IStrapiData<StrapiAuthor>>;
  category?: IStrapi<IStrapiData<StrapiCategory>>;
  locale: Locale;
  createdAt: string;
  updatedAt: string;
  metadata: StrapiMetadata | null;
  slices: any[];
  localizations: StrapiLocalization[];
  topBanner?: StrapiTopBanner;
}

export default StrapiBlogPost;
