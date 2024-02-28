import Locale from '../Locale';

interface StrapiPortfolio {
  name: string;
  title: string;
  host?: string;
  slices: any[];
  locale: Locale;
  createdAt: string;
  updatedAt: string;
}

export default StrapiPortfolio;
