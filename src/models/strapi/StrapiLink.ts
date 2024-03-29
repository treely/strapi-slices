import IStrapi from './IStrapi';
import IStrapiData from './IStrapiData';
import StrapiLinkPage from './StrapiLinkPage';

interface StrapiLink {
  id: number;
  text: string;
  page?: IStrapi<IStrapiData<StrapiLinkPage> | null>;
  url?: string;
  intercomLauncher?: boolean;
}

export default StrapiLink;
