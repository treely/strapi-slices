import IStrapiData from '../../models/strapi/IStrapiData';
import StrapiEvent, { EventType } from '../../models/strapi/StrapiEvent';
import { strapiMediaMock } from './strapiMedia';

export const strapiEventMock: IStrapiData<StrapiEvent> = {
  id: 1,
  attributes: {
    locale: 'en',
    image: {
      id: 1,
      alt: 'Image alt text 1',
      img: { data: strapiMediaMock },
    },
    logo: { id: 1, alt: 'Logo alt text 1', img: { data: strapiMediaMock } },
    eventTypes: [{ id: 1, eventType: EventType.MEET_UP }],
    languages: [{ id: 1, language: 'English', countryCode: 'GB' }],
    start: new Date('2024-02-12T08:30:00Z'),
    end: new Date('2024-03-12T09:30:00Z'),
    allDay: false,
    title: 'Event Title',
    description: 'Event Description',
    button: { id: 1, text: 'Button text', url: 'https://tree.ly' },
    recommended: false,
    speakers: [
      {
        id: 1,
        name: 'John Doe',
        image: {
          id: 1,
          alt: 'Speaker 1 alt text',
          img: { data: strapiMediaMock },
        },
      },
      {
        id: 2,
        name: 'Jane Doe',
        image: {
          id: 1,
          alt: 'Speaker 2 alt text',
          img: { data: strapiMediaMock },
        },
      },
    ],
    slices: [
      {
        __component: 'sections.rich-text',
        id: 6,
        content: '# This is my rich text!',
      },
    ],
    localizations: [
      {
        id: 2,
        locale: 'de',
      },
    ],
  },
};
