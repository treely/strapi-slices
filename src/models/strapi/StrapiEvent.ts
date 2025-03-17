import Locale from '../Locale';
import StrapiImage from './StrapiImage';
import StrapiLink from './StrapiLink';
import StrapiLocalization from './StrapiLocalization';
import StrapiTopBanner from './StrapiTopBanner';

export enum EventType {
  CONFERENCE = 'Conference',
  MEET_UP = 'Meet Up',
  WEBINAR = 'Webinar',
  FOREST_WALK = 'Forest Walk',
  LUNCH_AND_LEARN = 'Lunch & Learn',
  FESTIVAL = 'Festival',
  ROADSHOW = 'RoadShow',
  PARTNER_EVENT = 'Partner Event',
  FAIR = 'Fair',
}

interface StrapiEvent {
  title: string;
  description: string;
  button?: StrapiLink;
  buttonVariant?: 'outline' | 'ghost' | 'link' | 'solid' | 'outlineWhite';
  recommended?: boolean;
  speakers?: {
    id: number;
    name: string;
    image: StrapiImage;
  }[];
  image: StrapiImage;
  logo: StrapiImage;
  eventTypes: {
    id: number;
    eventType: EventType;
  }[];
  languages: {
    id: number;
    language: string;
    countryCode: string;
  }[];
  location?: string;
  locale: Locale;
  online?: boolean;
  startDate: Date;
  startTime?: string;
  endDate?: Date;
  endTime?: string;
  slices: any[];
  localizations: StrapiLocalization[];
  topBanner?: StrapiTopBanner;
}

export default StrapiEvent;
