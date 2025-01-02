import PageProps from '../PageProps';
import IStrapiData from './IStrapiData';
import StrapiEvent from './StrapiEvent';

interface StrapiEventProps extends PageProps, IStrapiData<StrapiEvent> {}

export default StrapiEventProps;
