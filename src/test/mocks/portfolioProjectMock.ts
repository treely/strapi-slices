import PortfolioProject from '../../models/PortfolioProject';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';

const portfolioProjectMock: PortfolioProject = {
  ...fpmProjectMock,
  slug: 'portfolio-slug',
};

export default portfolioProjectMock;
