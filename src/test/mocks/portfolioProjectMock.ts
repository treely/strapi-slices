import CreditsAvailableState from '../../models/CreditsAvailableState';
import PortfolioProject from '../../models/PortfolioProject';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';

const portfolioProjectMock: PortfolioProject = {
  ...fpmProjectMock,
  creditsAvailable: CreditsAvailableState.YES,
  slug: 'portfolio-slug',
};

export default portfolioProjectMock;
