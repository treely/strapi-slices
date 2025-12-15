import React from 'react';
import { Meta, StoryFn } from '@storybook/nextjs';
import { storybookStrapiTreeIconMock } from '../../test/storybookMocks/storybookStrapiMedia';
import Comparison from '.';
import { ComparisonCard } from './Comparison';

export default {
  title: 'slices/Comparison',
  component: Comparison,
} as Meta<typeof Comparison>;

const Template: StoryFn<typeof Comparison> = (args) => <Comparison {...args} />;

const comparisonCard: ComparisonCard = {
  id: 1,
  title: 'Title',
  subTitle: 'Subtitle',
  badge: 'Badge',
  variant: 'white',
  image: {
    id: 71,
    alt: 'Alt',
    img: { data: storybookStrapiTreeIconMock },
    objectFit: 'contain',
  },
  button: {
    id: 1,
    text: 'Button',
    url: 'https://tree.ly',
  },
  factTitle: 'Fact Title',
  factSubtitle: 'Fact Subtitle',
  lists: [
    {
      id: '1',
      title: 'Title',
      items: [
        {
          id: '1',
          text: 'Text',
          icon: 'bullet',
        },
        {
          id: '2',
          text: 'Text',
          icon: 'check',
        },
        {
          id: '3',
          text: 'Text',
          icon: 'cross',
        },
      ],
    },
    {
      id: '2',
      title: 'Title',
      items: [
        {
          id: '1',
          text: 'Text',
          icon: 'bullet',
        },
        {
          id: '2',
          text: 'Text',
          icon: 'check',
        },
        {
          id: '3',
          text: 'Text',
          icon: 'cross',
        },
      ],
    },
  ],
};

export const White = Template.bind({});
White.args = {
  slice: {
    comparisonCards: [
      comparisonCard,
      { ...comparisonCard, id: 2 },
      { ...comparisonCard, id: 3 },
    ],
  },
};

export const Gray = Template.bind({});
Gray.args = {
  slice: {
    comparisonCards: [
      { ...comparisonCard, variant: 'gray' },
      { ...comparisonCard, id: 2, variant: 'gray' },
      { ...comparisonCard, id: 3, variant: 'gray' },
    ],
  },
};

export const WithGreen = Template.bind({});
WithGreen.args = {
  slice: {
    comparisonCards: [
      { ...comparisonCard, variant: 'gray' },
      { ...comparisonCard, id: 2, variant: 'green' },
      { ...comparisonCard, id: 3 },
    ],
  },
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  slice: {
    title: 'Title',
    subTitle: 'Subtitle',
    tagline: 'Tagline',
    comparisonCards: [
      { ...comparisonCard, variant: 'gray' },
      { ...comparisonCard, id: 2, variant: 'green' },
      { ...comparisonCard, id: 3 },
    ],
  },
};
