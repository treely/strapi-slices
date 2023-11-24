import Locale from '../Locale';
import StrapiImage from './StrapiImage';
import StrapiLocalization from './StrapiLocalization';
import StrapiMetadata from './StrapiMetadata';
import StrapiTopBanner from './StrapiTopBanner';

interface StrapiCustomerStory {
  title: string;
  slug: string;
  img: StrapiImage;
  customerName: string;
  customerIndustry: string;
  customerLogo: StrapiImage;
  locale: Locale;
  createdAt: string;
  updatedAt: string;
  metadata: StrapiMetadata | null;
  slices: any[];
  localizations: StrapiLocalization[];
  topBanner?: StrapiTopBanner;
}

export default StrapiCustomerStory;
