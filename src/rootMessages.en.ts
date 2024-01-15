import comparisonMessagesEn from './slices/Comparison/messages.en';
import ctaMessagesEn from './slices/Cta/messages.en';
import customerStoriesEn from './slices/CustomerStories/messages.en';
import glossaryMessagesEn from './slices/Glossary/messages.en';
import projectFactsMessagesEn from './slices/ProjectFacts/messages.en';
import projectsMapMessagesEn from './slices/ProjectsMap/messages.en';
import shopCheckoutMessagesEn from './slices/ShopCheckout/messages.en';
import creditsAvailableBadgeMessagesEn from './components/CreditsAvailableBadge/messages.en';
import portfolioDocumentsDownloadListMessagesEn from './components/portfolio/DocumentsDownloadList/messages.en';
import portfolioProjectInfoMessagesEn from './components/portfolio/ProjectInfo/messages.en';
import portfolioSmallCheckoutMessagesEn from './components/portfolio/SmallCheckout/messages.en';
import portfolioProjectCardMessagesEn from './components/portfolio/PortfolioProjectCard/messages.en';

import unitMessagesEn from './unit.messages.en';

const rootMessagesEn = {
  //
  // Components
  //
  ...creditsAvailableBadgeMessagesEn,
  ...portfolioDocumentsDownloadListMessagesEn,
  ...portfolioProjectCardMessagesEn,
  ...portfolioProjectInfoMessagesEn,
  ...portfolioSmallCheckoutMessagesEn,

  //
  // Slices
  //
  ...comparisonMessagesEn,
  ...ctaMessagesEn,
  ...customerStoriesEn,
  ...glossaryMessagesEn,
  ...projectFactsMessagesEn,
  ...projectsMapMessagesEn,
  ...shopCheckoutMessagesEn,

  //
  // Units
  //
  ...unitMessagesEn,
};

export default rootMessagesEn;
