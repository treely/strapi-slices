import comparisonMessagesEn from './slices/Comparison/messages.en';
import certificationBadgeMessagesEn from './components/CertificationBadge/messages.en';
import creditsAvailableBadgeMessagesEn from './components/CreditsAvailableBadge/messages.en';
import projectGridCardV2MessagesEn from './components/ProjectGridCardV2/messages.en';
import ctaMessagesEn from './slices/Cta/messages.en';
import customerCardMessagesEn from './components/CustomerCard/messages.en';
import customerQuoteCardMessagesEn from './components/CustomerQuoteCard/messages.en';
import eventCardMessagesEn from './components/EventCard/messages.en';
import eventsMessagesEn from './slices/Events/messages.en';
import glossaryMessagesEn from './slices/Glossary/messages.en';
import portfolioDocumentsDownloadListMessagesEn from './components/portfolio/DocumentsDownloadList/messages.en';
import projectFactsMessagesEn from './slices/ProjectFacts/messages.en';
import projectsMapMessagesEn from './slices/ProjectsMap/messages.en';
import portfolioProjectInfoMessagesEn from './components/portfolio/ProjectInfo/messages.en';
import portfolioSmallCheckoutMessagesEn from './components/portfolio/SmallCheckout/messages.en';
import shopCheckoutMessagesEn from './slices/ShopCheckout/messages.en';
import textCarouselMessagesEn from './slices/TextCarousel/messages.en';
import timelineMessagesEn from './slices/Timeline/messages.en';

import unitMessagesEn from './unit.messages.en';

const rootMessagesEn = {
  //
  // Components
  //
  ...certificationBadgeMessagesEn,
  ...creditsAvailableBadgeMessagesEn,
  ...eventCardMessagesEn,
  ...projectGridCardV2MessagesEn,
  ...portfolioDocumentsDownloadListMessagesEn,
  ...portfolioProjectInfoMessagesEn,
  ...portfolioSmallCheckoutMessagesEn,

  //
  // Slices
  //
  ...comparisonMessagesEn,
  ...ctaMessagesEn,
  ...customerCardMessagesEn,
  ...customerQuoteCardMessagesEn,
  ...eventsMessagesEn,
  ...glossaryMessagesEn,
  ...projectFactsMessagesEn,
  ...projectsMapMessagesEn,
  ...shopCheckoutMessagesEn,
  ...textCarouselMessagesEn,
  ...timelineMessagesEn,

  //
  // Units
  //
  ...unitMessagesEn,
};

export default rootMessagesEn;
