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
  description:
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  eventType: 'Webinar',
  language: 'English',
  languageCountryCode: 'GB',
  location: 'Klagenfurt am Wörthersee',
  start: new Date('Thu Mar 17 2024 08:00:00 GMT+0000 (GMT)'),
  end: new Date('Thu Mar 17 2024 09:30:00 GMT+0000 (GMT)'),
  button: {
    id: 1,
    text: 'Call to Action Button',
    url: 'https://tree.ly',
  },
  buttonVariant: 'solid' as 'solid' | 'outline' | 'ghost' | 'link',
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
      {
        ...eventCard,
        id: 3,
      },
    ],
  },
};

export const WithRecommendedTag = Template.bind({});
WithRecommendedTag.args = {
  slice: {
    eventCards: [
      { ...eventCard, recommended: true, online: true },
      {
        ...eventCard,
        id: 2,
        recommended: true,
      },
      {
        ...eventCard,
        id: 3,
        recommended: true,
      },
    ],
  },
};

export const WithOutlineButton = Template.bind({});
WithOutlineButton.args = {
  slice: {
    eventCards: [
      { ...eventCard, buttonVariant: 'outline' },
      {
        ...eventCard,
        id: 2,
        eventType: 'Conference',
        buttonVariant: 'outline',
      },
      {
        ...eventCard,
        id: 3,
        buttonVariant: 'outline',
      },
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
          { ...speaker, id: 2, caption: 'Lukas Bals' },
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

export const WithFilerSearch = Template.bind({});
WithFilerSearch.args = {
  slice: {
    filterSearch: true,
    eventCards: [
      eventCard,
      {
        ...eventCard,
        id: 2,
      },
      {
        ...eventCard,
        id: 3,
      },
    ],
  },
};
