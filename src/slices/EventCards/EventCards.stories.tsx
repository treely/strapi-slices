import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import {
  storybookStrapiAvatarMock,
  storybookStrapiCoverMock,
  storybookStrapiTreeIconMock,
} from '../../test/storybookMocks/storybookStrapiMedia';
import { EventCards } from './EventCards';

export default {
  title: 'slices/EventCards',
  component: EventCards,
} as Meta<typeof EventCards>;

const Template: StoryFn<typeof EventCards> = (args) => <EventCards {...args} />;

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
  title:
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo eget dolor.',
  text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  eventType: 'Webinar',
  language: 'English',
  languageCountryCode: 'GB',
  location: 'London',
  start: new Date('Thu Mar 17 2024 08:00:00 GMT+0000 (GMT)'),
  end: new Date('Thu Mar 17 2024 09:30:00 GMT+0000 (GMT)'),
  button: {
    id: 1,
    text: 'Call to Action Button',
    url: 'https://tree.ly',
  },
  speakers: [speaker],
};

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    eventCards: [
      eventCard,
      {
        ...eventCard,
        id: 2,
        eventType: 'Conference',
      },
      { ...eventCard, id: 3 },
    ],
  },
};

export const WithTaglineAndTitle = Template.bind({});
WithTaglineAndTitle.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    eventCards: [
      eventCard,
      {
        ...eventCard,
        id: 2,
        eventType: 'Meet Up',
        speakers: [
          speaker,
          { ...speaker, id: 2, caption: 'Lukas' },
          { ...speaker, id: 3 },
        ],
      },
      {
        ...eventCard,
        id: 3,
        eventType: 'Fair',
        speakers: [
          speaker,
          { ...speaker, id: 2 },
          { ...speaker, id: 3 },
          { ...speaker, id: 4 },
          { ...speaker, id: 5 },
        ],
      },
    ],
  },
};
