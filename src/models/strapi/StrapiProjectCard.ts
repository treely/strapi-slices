import IStrapi from './IStrapi';
import IStrapiData from './IStrapiData';
import StrapiProject from './StrapiProject';

interface StrapiProjectCard {
  id: number;
  project: IStrapi<IStrapiData<StrapiProject>>;
}

export default StrapiProjectCard;
