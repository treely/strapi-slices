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
  text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  eventType: 'webinar',
  language: 'English',
  location: 'London',
  date: new Date(),
  time: '12:00',
  button: {
    id: 1,
    text: 'Button',
    url: 'https://tree.ly',
  },
  speakers: [
    {
      id: 1,
      name: 'John Doe',
      image: {
        id: 1,
        alt: 'Alt text',
        img: { data: storybookStrapiAvatarMock },
      },
    },
  ],
};

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    eventCards: [
      eventCard,
      {
        ...eventCard,
        id: 2,
        eventType: 'conference',
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
        eventType: 'conference',
      },
      { ...eventCard, id: 3 },
    ],
  },
};
