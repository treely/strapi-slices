import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiCoverMock } from '../../test/storybookMocks/storybookStrapiMedia';
import TextCarousel from '.';

export default {
  title: 'slices/TextCarousel',
  component: TextCarousel,
} as Meta<typeof TextCarousel>;

const Template: StoryFn<typeof TextCarousel> = (args) => (
  <TextCarousel {...args} />
);

const button = { id: 1, text: 'Button', url: 'https://tree.ly' };
const image = {
  id: 1,
  img: { data: storybookStrapiCoverMock },
  alt: 'Project Thumbnail',
};

const slide = {
  id: 1,
  title: 'Title 1',
  text: 'Text 1',
  icon: {
    id: 1,
    alt: 'Icon alt text',
    img: { data: storybookStrapiCoverMock },
  },
};

const slides = [
  slide,
  { ...slide, id: 2, title: 'Title 2', text: 'Text 2' },
  { ...slide, id: 3, title: 'Title 3', text: 'Text 3' },
  { ...slide, id: 4, title: 'Title 4', text: 'Text 4' },
  { ...slide, id: 5, title: 'Title 5', text: 'Text 5' },
];

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    slides,
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    slides,
  },
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    slides,
  },
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    slides,
    button,
  },
};

export const FullProps = Template.bind({});
FullProps.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    slides: [
      {
        ...slide,
        id: 1,
        button,
        image,
      },
      {
        ...slide,
        id: 2,
        button,
        image,
      },
      {
        ...slide,
        id: 3,
        button,
        image,
      },
      {
        ...slide,
        id: 4,
        button,
        image,
      },
      {
        ...slide,
        id: 5,
        button,
        image,
      },
    ],
    button,
  },
};
