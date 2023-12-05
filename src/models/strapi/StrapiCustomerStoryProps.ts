import PageProps from '../PageProps';
import IStrapiData from './IStrapiData';
import StrapiCustomerStory from './StrapiCustomerStory';

interface StrapiCustomerStoryProps
  extends PageProps,
    IStrapiData<StrapiCustomerStory> {}

export default StrapiCustomerStoryProps;
