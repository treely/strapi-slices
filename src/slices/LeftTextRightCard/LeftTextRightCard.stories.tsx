import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiCoverMock } from '@/test/storybookMocks/storybookStrapiMedia';
import LeftTextRightCard from '.';

export default {
  title: 'sections/LeftTextRightCard',
  component: LeftTextRightCard,
} as Meta<typeof LeftTextRightCard>;

const Template: StoryFn<typeof LeftTextRightCard> = (args) => (
  <LeftTextRightCard {...args} />
);

const checkMarkLabels = [
  { id: 1, text: 'List item 1' },
  { id: 2, text: 'List item 2' },
  { id: 3, text: 'List item 3' },
];
const button = { id: 1, text: 'Button', url: 'https://tree.ly' };

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
  },
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
  },
};

export const WithList = Template.bind({});
WithList.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    checkMarkLabels,
  },
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    checkMarkLabels,
    button,
  },
};

export const WithCard = Template.bind({});
WithCard.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    checkMarkLabels,
    button,
    card: {
      id: 1,
      image: {
        id: 1,
        alt: 'Image alt text',
        img: { data: storybookStrapiCoverMock },
      },
      portfolioNumber: 'Portfolio #1',
      title: 'Card title',
      facts: [
        { id: 1, key: 'Fact key 1', value: 'Face value 1' },
        { id: 2, key: 'Fact key 2', value: 'Face value 2' },
        { id: 3, key: 'Fact key 3', value: 'Face value 3' },
        { id: 4, key: 'Fact key 4', value: 'Face value 4' },
      ],
      button,
    },
  },
};
