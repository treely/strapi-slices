import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import {
  storybookStrapiAvatarMock,
  storybookStrapiCoverMock,
  storybookStrapiTreeIconMock,
} from '../../test/storybookMocks/storybookStrapiMedia';
import Events from '.';
import { EventType } from '../../models/strapi/StrapiEvent';

export default {
  title: 'slices/Events',
  component: Events,
} as Meta<typeof Events>;

const Template: StoryFn<typeof Events> = (args) => <Events {...args} />;

const speaker = {
  id: 1,
  caption: 'John Doe',
  img: {
    id: 1,
    alt: 'Alt text',
    img: { data: storybookStrapiAvatarMock },
  },
};

const eventCard = {
  id: 1,
  attributes: {
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
    logo: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiTreeIconMock },
    },
    title: 'Lorem ipsum dolor sit amet, consectetuer adipisci.',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    eventTypes: [{ id: 1, eventType: EventType.WEBINAR }],
    languages: [{ id: 1, language: 'English', countryCode: 'GB' }],
    location: 'Klagenfurt am Wörthersee',
    start: new Date('2022-01-10T14:59:44.830Z'),
    end: new Date('2022-01-10T14:59:44.830Z'),
    button: {
      id: 1,
      text: 'Call to Action Button',
      url: 'https://tree.ly',
    },
    buttonVariant: 'solid' as 'solid' | 'outline' | 'ghost' | 'link',
    speakers: [speaker],
    slug: 'event-1',
    locale: 'en',
    metadata: null,
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

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    events: [
      eventCard,
      {
        ...eventCard,
        id: 2,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-2',
          eventTypes: [{ id: 1, eventType: EventType.CONFERENCE }],
          description:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ',
        },
      },
      {
        ...eventCard,
        id: 3,
        attributes: { ...eventCard.attributes, slug: 'event-3' },
      },
    ],
  },
};

export const WithTaglineAndTitle = Template.bind({});
WithTaglineAndTitle.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    events: [
      eventCard,
      {
        ...eventCard,
        id: 2,
        attributes: {
          ...eventCard.attributes,
          eventTypes: [
            { id: 1, eventType: EventType.FAIR },
            { id: 2, eventType: EventType.FOREST_WALK },
          ],
          slug: 'event-2',
          speakers: [
            speaker,
            { ...speaker, id: 2, caption: 'Lukas Bals' },
            { ...speaker, id: 3 },
          ],
        },
      },
      {
        ...eventCard,
        id: 3,
        attributes: {
          ...eventCard.attributes,
          eventTypes: [
            { id: 1, eventType: EventType.FAIR },
            { id: 2, eventType: EventType.CONFERENCE },
          ],
          slug: 'event-3',
          speakers: [
            speaker,
            { ...speaker, id: 2 },
            { ...speaker, id: 3 },
            { ...speaker, id: 4 },
            { ...speaker, id: 5 },
          ],
        },
      },
    ],
  },
};

export const WithMultipleSpeakers = Template.bind({});
WithMultipleSpeakers.args = {
  slice: {
    events: [
      eventCard,
      {
        ...eventCard,
        id: 2,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-2',
          speakers: [
            speaker,
            { ...speaker, id: 2, caption: 'Lukas Bals' },
            { ...speaker, id: 3, caption: 'Morty Smith' },
          ],
        },
      },
      {
        ...eventCard,
        id: 3,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-3',
          speakers: [
            speaker,
            { ...speaker, id: 2, caption: 'Lukas Bals' },
            { ...speaker, id: 3, caption: 'Rick Sanchez' },
            { ...speaker, id: 4, caption: 'Summer Smith' },
            { ...speaker, id: 5, caption: 'Morty Smith' },
          ],
        },
      },
    ],
  },
};

export const WithRecommendedTag = Template.bind({});
WithRecommendedTag.args = {
  slice: {
    events: [
      {
        ...eventCard,
        attributes: {
          ...eventCard.attributes,
          recommended: true,
          online: true,
        },
      },
      {
        ...eventCard,
        id: 2,
        attributes: {
          ...eventCard.attributes,
          recommended: true,
          slug: 'event-2',
        },
      },
      {
        ...eventCard,
        id: 3,
        attributes: {
          ...eventCard.attributes,
          recommended: true,
          slug: 'event-3',
        },
      },
    ],
  },
};

export const WithMultipleLanguages = Template.bind({});
WithMultipleLanguages.args = {
  slice: {
    events: [
      {
        ...eventCard,
        attributes: {
          ...eventCard.attributes,
          languages: [
            { id: 1, language: 'English', countryCode: 'GB' },
            { id: 2, language: 'German', countryCode: 'DE' },
          ],
        },
      },
      {
        ...eventCard,
        id: 2,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-2',
          languages: [
            { id: 3, language: 'Slovenian', countryCode: 'SV' },
            { id: 4, language: 'Hungarian', countryCode: 'HU' },
          ],
        },
      },
      {
        ...eventCard,
        id: 3,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-3',
          languages: [
            { id: 5, language: 'French', countryCode: 'FR' },
            { id: 6, language: 'Italian', countryCode: 'IT' },
          ],
        },
      },
    ],
  },
};

export const WithOutlineButton = Template.bind({});
WithOutlineButton.args = {
  slice: {
    events: [
      {
        ...eventCard,
        attributes: {
          ...eventCard.attributes,
          buttonVariant: 'outline',
        },
      },
      {
        ...eventCard,
        id: 2,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-2',
          buttonVariant: 'outline',
        },
      },
      {
        ...eventCard,
        id: 3,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-3',
          buttonVariant: 'outline',
        },
      },
    ],
  },
};

export const WithAllEventTypeOptions = Template.bind({});
WithAllEventTypeOptions.args = {
  slice: {
    events: [
      eventCard,
      {
        ...eventCard,
        id: 2,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-2',
          eventTypes: [
            { id: 1, eventType: EventType.MEET_UP },
            { id: 2, eventType: EventType.FAIR },
          ],
        },
      },
      {
        ...eventCard,
        id: 3,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-3',

          eventTypes: [
            { id: 3, eventType: EventType.CONFERENCE },
            { id: 4, eventType: EventType.FOREST_WALK },
          ],
        },
      },
      {
        ...eventCard,
        id: 4,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-4',

          eventTypes: [
            { id: 5, eventType: EventType.PARTNER_EVENT },
            { id: 6, eventType: EventType.LUNCH_AND_LEARN },
          ],
        },
      },
      {
        ...eventCard,
        id: 5,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-5',

          eventTypes: [
            { id: 7, eventType: EventType.FESTIVAL },
            { id: 8, eventType: EventType.ROADSHOW },
          ],
        },
      },
    ],
  },
};

export const WithFilerSearch = Template.bind({});
WithFilerSearch.args = {
  slice: {
    filterSearch: true,
    events: [
      {
        ...eventCard,
        id: 2,
        attributes: {
          ...eventCard.attributes,
          eventTypes: [
            { id: 7, eventType: EventType.FESTIVAL },
            { id: 8, eventType: EventType.ROADSHOW },
          ],
          languages: [
            { id: 3, language: 'English', countryCode: 'GB' },
            { id: 4, language: 'Hungarian', countryCode: 'HU' },
          ],
        },
      },
      {
        ...eventCard,
        id: 2,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-2',
          eventTypes: [
            { id: 7, eventType: EventType.FOREST_WALK },
            { id: 8, eventType: EventType.FAIR },
          ],
          languages: [
            { id: 3, language: 'Slovenian', countryCode: 'SV' },
            { id: 4, language: 'Hungarian', countryCode: 'HU' },
          ],
        },
      },
      {
        ...eventCard,
        id: 3,
        attributes: {
          ...eventCard.attributes,
          slug: 'event-3',
          eventTypes: [
            { id: 7, eventType: EventType.CONFERENCE },
            { id: 8, eventType: EventType.LUNCH_AND_LEARN },
          ],
          languages: [
            { id: 3, language: 'German', countryCode: 'DE' },
            { id: 4, language: 'Spanish', countryCode: 'ES' },
          ],
        },
      },
    ],
  },
};
