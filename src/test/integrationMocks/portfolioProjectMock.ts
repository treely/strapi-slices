import { PortfolioProject } from '../..';
import fpmProjectMock from './fpmProjectMock';
import { strapiProjectMock } from '../strapiMocks/strapiProject';
import { storybookStrapiCoverMock } from '../storybookMocks/storybookStrapiMedia';

const portfolioProjectMock: PortfolioProject = {
  ...strapiProjectMock.attributes,
  ...fpmProjectMock,
  isPublic: true,
  footerSubTitle: 'Certified, 2023',
  thumbnail: {
    id: 1,
    img: { data: storybookStrapiCoverMock },
    alt: 'Project Thumbnail',
  },
};

export default portfolioProjectMock;
