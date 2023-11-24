import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { storybookStrapiCoverMock } from '@/test/storybookMocks/storybookStrapiMedia';
import ImageTextSequence from '.';

export default {
  title: 'sections/ImageTextSequence',
  component: ImageTextSequence,
} as Meta<typeof ImageTextSequence>;

const Template: StoryFn<typeof ImageTextSequence> = (args) => (
  <ImageTextSequence {...args} />
);

const imageTextRows = [
  {
    id: 1,
    title: 'Row title 1',
    text: 'Row text 1',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
  },
  {
    id: 2,
    title: 'Row title 2',
    text: 'Row text 2',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
  },
  {
    id: 3,
    title: 'Row title 3',
    text: 'Row text 3',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
  },
];

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    imageTextRows,
    background: true,
  },
};
Minimal.parameters = {
  backgrounds: { default: 'grey' },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    imageTextRows,
    background: true,
  },
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    imageTextRows,
    background: true,
  },
};

export const WithButtons = Template.bind({});
WithButtons.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    imageTextRows: [
      {
        ...imageTextRows[0],
        button: {
          id: 1,
          text: 'Button 1',
          url: 'https://tree.ly',
        },
      },
      {
        ...imageTextRows[1],
        button: {
          id: 2,
          text: 'Button 2',
          url: 'https://tree.ly',
        },
      },
      {
        ...imageTextRows[2],
        button: {
          id: 3,
          text: 'Button 3',
          url: 'https://tree.ly',
        },
      },
    ],
    background: true,
  },
};

export const WithoutBackgroundMap = Template.bind({});
WithoutBackgroundMap.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    imageTextRows,
    background: false,
  },
};
