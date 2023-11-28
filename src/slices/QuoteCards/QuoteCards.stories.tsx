import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import {
  storybookStrapiAvatarMock,
  storybookStrapiCoverMock,
  storybookStrapiGradientTopDownMock,
} from '../../test/storybookMocks/storybookStrapiMedia';
import QuoteCards from '.';

export default {
  title: 'slices/QuoteCards',
  component: QuoteCards,
} as Meta<typeof QuoteCards>;

const Template: StoryFn<typeof QuoteCards> = (args) => <QuoteCards {...args} />;

const cards = [
  {
    id: 1,
    text: 'Card text 1',
    avatar: {
      id: 1,
      name: 'Avatar name',
      description: 'Avatar description',
      image: {
        id: 1,
        alt: 'Avatar image alt text',
        img: { data: storybookStrapiAvatarMock },
      },
    },
  },
  {
    id: 2,
    text: 'Card text 2',
    avatar: {
      id: 1,
      name: 'Avatar name',
      description: 'Avatar description',
      image: {
        id: 1,
        alt: 'Avatar image alt text',
        img: { data: storybookStrapiAvatarMock },
      },
    },
  },
];
const shapes = [
  { id: 1, alt: 'Shape 1', img: { data: storybookStrapiCoverMock } },
  { id: 2, alt: 'Shape 2', img: { data: storybookStrapiGradientTopDownMock } },
];

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    cards: [cards[0]],
  },
};

export const WithMultipleCards = Template.bind({});
WithMultipleCards.args = {
  slice: {
    title: 'Title',
    cards,
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    cards,
  },
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    cards,
  },
};

export const WithShapes = Template.bind({});
WithShapes.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    shapes,
    cards,
  },
};

export const WithHero = Template.bind({});
WithHero.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    shapes,
    cards,
    hero: {
      id: 1,
      title: 'Title',
      subTitle: 'Sub title',
      button: { id: 1, text: 'Button', url: 'https://tree.ly' },
      image: {
        id: 1,
        alt: 'Hero image alt text',
        img: { data: storybookStrapiCoverMock },
      },
    },
  },
};
