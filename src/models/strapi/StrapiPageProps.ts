import PageProps from '../PageProps';
import IStrapiData from './IStrapiData';
import StrapiPage from './StrapiPage';

interface StrapiPageProps extends PageProps, IStrapiData<StrapiPage> {}

export default StrapiPageProps;
