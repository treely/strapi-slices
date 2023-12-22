import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiCoverMock } from '../../test/storybookMocks/storybookStrapiMedia';
import fpmProjectMock from '../../test/integrationMocks/fpmProjectMock';
import { strapiProjectMock } from '../../test/strapiMocks/strapiProject';
import TextWithCard from '.';

export default {
  title: 'slices/TextWithCard',
  component: TextWithCard,
} as Meta<typeof TextWithCard>;

const Template: StoryFn<typeof TextWithCard> = (args) => (
  <TextWithCard {...args} />
);

const listItems = [
  { id: 1, text: 'List item 1' },
  { id: 2, text: 'List item 2' },
  { id: 3, text: 'List item 3' },
];
const button = { id: 1, text: 'Button', url: 'https://tree.ly' };
const card = {
  id: 1,
  image: {
    id: 1,
    alt: 'Image alt text',
    img: { data: storybookStrapiCoverMock },
  },
  title: 'Card title',
  facts: [
    { id: 1, text: 'Fact 1' },
    { id: 2, text: 'Fact 2' },
    { id: 3, text: 'Fact 3' },
    { id: 4, text: 'Fact 4' },
  ],
  project: { data: strapiProjectMock },
};
const projects = [{ ...fpmProjectMock, slug: 'slug' }];

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    cardPosition: 'left',
  },
  projects,
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    cardPosition: 'left',
  },
  projects,
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    cardPosition: 'left',
  },
  projects,
};

export const WithList = Template.bind({});
WithList.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    listItems,
    cardPosition: 'left',
  },
  projects,
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    listItems,
    button,
    cardPosition: 'left',
  },
  projects,
};

export const WithCard = Template.bind({});
WithCard.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    listItems,
    button,
    card,
    cardPosition: 'left',
  },
  projects,
};

export const WithCardOnRight = Template.bind({});
WithCardOnRight.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    listItems,
    button,
    card,
    cardPosition: 'right',
  },
  projects,
};
