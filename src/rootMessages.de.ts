import comparisonMessagesDe from './slices/Comparison/messages.de';
import ctaMessagesDe from './slices/Cta/messages.de';
import customerStoriesDe from './slices/CustomerStories/messages.de';
import glossaryMessagesDe from './slices/Glossary/messages.de';
import projectFactsMessagesDe from './slices/ProjectFacts/messages.de';
import projectsMapMessagesDe from './slices/ProjectsMap/messages.de';
import shopCheckoutMessagesDe from './slices/ShopCheckout/messages.de';
import creditsAvailableBadgeMessagesDe from './components/CreditsAvailableBadge/messages.de';
import portfolioDocumentsDownloadListMessagesDe from './components/portfolio/DocumentsDownloadList/messages.de';
import portfolioProjectInfoMessagesDe from './components/portfolio/ProjectInfo/messages.de';
import portfolioSmallCheckoutMessagesDe from './components/portfolio/SmallCheckout/messages.de';
import portfolioProjectCardMessagesDe from './components/portfolio/PortfolioProjectCard/messages.de';

import unitMessagesDe from './unit.messages.en';

const rootMessagesDe = {
  //
  // Components
  //
  ...creditsAvailableBadgeMessagesDe,
  ...portfolioDocumentsDownloadListMessagesDe,
  ...portfolioProjectCardMessagesDe,
  ...portfolioProjectInfoMessagesDe,
  ...portfolioSmallCheckoutMessagesDe,

  //
  // Slices
  //
  ...comparisonMessagesDe,
  ...ctaMessagesDe,
  ...customerStoriesDe,
  ...glossaryMessagesDe,
  ...projectFactsMessagesDe,
  ...projectsMapMessagesDe,
  ...shopCheckoutMessagesDe,

  //
  // Units
  //
  ...unitMessagesDe,
};

export default rootMessagesDe;
