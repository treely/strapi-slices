import { PortfolioProject } from '../..';
import fpmProjectMock from './fpmProjectMock';
import { storybookStrapiCoverMock } from '../storybookMocks/storybookStrapiMedia';

const fpmPortfolioProjectMock: PortfolioProject = {
  ...fpmProjectMock,
  isPublic: true,
  footerSubTitle: 'Certified, 2023',
  thumbnail: {
    id: 1,
    img: { data: storybookStrapiCoverMock },
    alt: 'Project Thumbnail',
  },
};

export default fpmPortfolioProjectMock;
