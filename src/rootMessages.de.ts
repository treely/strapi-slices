import comparisonMessagesDe from './slices/Comparison/messages.de';
import certificationBadgeMessagesDe from './components/CertificationBadge/messages.de';
import creditsAvailableBadgeMessagesDe from './components/CreditsAvailableBadge/messages.de';
import projectGridCardV2MessagesDe from './components/ProjectGridCardV2/messages.de';
import ctaMessagesDe from './slices/Cta/messages.de';
import customerCardMessagesDe from './components/CustomerCard/messages.de';
import customerQuoteCardMessagesDe from './components/CustomerQuoteCard/messages.de';
import eventCardMessagesDe from './components/EventCard/messages.de';
import eventsMessagesDe from './slices/Events/messages.de';
import glossaryMessagesDe from './slices/Glossary/messages.de';
import portfolioDocumentsDownloadListMessagesDe from './components/portfolio/DocumentsDownloadList/messages.de';
import projectFactsMessagesDe from './slices/ProjectFacts/messages.de';
import projectsMapMessagesDe from './slices/ProjectsMap/messages.de';
import portfolioProjectInfoMessagesDe from './components/portfolio/ProjectInfo/messages.de';
import portfolioSmallCheckoutMessagesDe from './components/portfolio/SmallCheckout/messages.de';
import shopCheckoutMessagesDe from './slices/ShopCheckout/messages.de';
import textCarouselMessagesDe from './slices/TextCarousel/messages.de';
import timelineMessagesDe from './slices/Timeline/messages.de';

import unitMessagesDe from './unit.messages.de';

const rootMessagesDe = {
  //
  // Components
  //
  ...certificationBadgeMessagesDe,
  ...creditsAvailableBadgeMessagesDe,
  ...eventCardMessagesDe,
  ...projectGridCardV2MessagesDe,
  ...portfolioDocumentsDownloadListMessagesDe,
  ...portfolioProjectInfoMessagesDe,
  ...portfolioSmallCheckoutMessagesDe,

  //
  // Slices
  //
  ...comparisonMessagesDe,
  ...ctaMessagesDe,
  ...customerCardMessagesDe,
  ...customerQuoteCardMessagesDe,
  ...eventsMessagesDe,
  ...glossaryMessagesDe,
  ...projectFactsMessagesDe,
  ...projectsMapMessagesDe,
  ...shopCheckoutMessagesDe,
  ...textCarouselMessagesDe,
  ...timelineMessagesDe,

  //
  // Units
  //
  ...unitMessagesDe,
};

export default rootMessagesDe;
