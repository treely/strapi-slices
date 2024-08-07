import { PortfolioProject } from '../..';
import fpmProjectMock from './fpmProjectMock';
import { storybookStrapiCoverMock } from '../storybookMocks/storybookStrapiMedia';

const portfolioProjectMock: PortfolioProject = {
  ...fpmProjectMock,
  isPublic: true,
  slug: 'slug',
  thumbnail: {
    id: 1,
    img: { data: storybookStrapiCoverMock },
    alt: 'Project Thumbnail',
  },
};

export default portfolioProjectMock;
