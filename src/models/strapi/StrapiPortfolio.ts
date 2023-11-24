import Locale from '../Locale';

interface StrapiPortfolio {
  name: string;
  title: string;
  slices: any[];
  locale: Locale;
  createdAt: string;
  updatedAt: string;
}

export default StrapiPortfolio;
