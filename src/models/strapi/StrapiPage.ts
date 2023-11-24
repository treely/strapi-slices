import Locale from '../Locale';
import StrapiLocalization from './StrapiLocalization';
import StrapiMetadata from './StrapiMetadata';
import StrapiTopBanner from './StrapiTopBanner';

interface StrapiPage {
  title: string;
  slug: string;
  locale: Locale;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  metadata: StrapiMetadata | null;
  slices: any[];
  localizations: StrapiLocalization[];
  topBanner?: StrapiTopBanner;
}

export default StrapiPage;
