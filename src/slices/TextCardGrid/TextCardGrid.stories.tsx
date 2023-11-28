import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import {
  storybookStrapiCoverMock,
  storybookStrapiGradientBottomUpMock,
} from '../../test/storybookMocks/storybookStrapiMedia';
import TextCardGrid from '.';

export default {
  title: 'slices/TextCardGrid',
  component: TextCardGrid,
} as Meta<typeof TextCardGrid>;

const Template: StoryFn<typeof TextCardGrid> = (args) => (
  <TextCardGrid {...args} />
);

const cards = [
  {
    id: 1,
    title: 'Title 1',
    text: '*Supports* **Markdown**',
    image: {
      id: 1,
      alt: 'Shape alt text',
      img: { data: storybookStrapiGradientBottomUpMock },
    },
  },
  {
    id: 2,
    title: 'Title 2',
    text: 'Text 2',
    image: {
      id: 1,
      alt: 'Shape alt text',
      img: { data: storybookStrapiGradientBottomUpMock },
    },
  },
  {
    id: 3,
    title: 'Title 3',
    text: 'Text 3',
    image: {
      id: 1,
      alt: 'Shape alt text',
      img: { data: storybookStrapiGradientBottomUpMock },
    },
  },
];

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    variant: 'shape',
    cards,
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    variant: 'shape',
    cards,
  },
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    variant: 'shape',
    cards,
  },
};

export const WithTaglineInCards = Template.bind({});
WithTaglineInCards.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    variant: 'shape',
    cards: [
      { ...cards[0], tagline: 'Tagline 1' },
      { ...cards[1], tagline: 'Tagline 2' },
      { ...cards[2], tagline: 'Tagline 3' },
    ],
  },
};

export const ImageVariant = Template.bind({});
ImageVariant.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    variant: 'image',
    cards: [
      {
        ...cards[0],
        tagline: 'Tagline 1',
        image: {
          id: 1,
          alt: 'Image alt text',
          img: { data: storybookStrapiCoverMock },
        },
      },
      {
        ...cards[1],
        tagline: 'Tagline 2',
        image: {
          id: 1,
          alt: 'Image alt text',
          img: { data: storybookStrapiCoverMock },
        },
      },
      {
        ...cards[2],
        tagline: 'Tagline 3',
        image: {
          id: 1,
          alt: 'Image alt text',
          img: { data: storybookStrapiCoverMock },
        },
      },
    ],
  },
};

export const WithButtons = Template.bind({});
WithButtons.args = {
  slice: {
    title: 'Title',
    variant: 'shape',
    cards: [
      {
        ...cards[0],
      },
      {
        ...cards[1],
        buttons: [
          { id: 1, url: 'url', text: 'Learn more' },
          { id: 2, url: 'url', text: 'Contact us', intercomLauncher: true },
        ],
      },
      {
        ...cards[2],
      },
    ],
  },
};
