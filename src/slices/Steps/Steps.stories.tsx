import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import {
  storybookStrapiCoverMock,
  storybookStrapiGradientBottomUpMock,
  storybookStrapiGradientTopDownMock,
} from '@/test/storybookMocks/storybookStrapiMedia';
import Steps from '.';

export default {
  title: 'sections/Steps',
  component: Steps,
} as Meta<typeof Steps>;

const Template: StoryFn<typeof Steps> = (args) => <Steps {...args} />;

const steps = [
  { id: 1, step: 1, title: 'Title 1', text: 'Text' },
  { id: 2, step: 2, title: 'Title 2' },
];

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    steps,
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    steps,
  },
};

export const WithTaglineAndText = Template.bind({});
WithTaglineAndText.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    steps,
  },
};

export const WithImage = Template.bind({});
WithImage.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    steps,
    image: {
      id: 1,
      alt: 'Image alt text',
      img: { data: storybookStrapiCoverMock },
    },
  },
};

export const WithCard = Template.bind({});
WithCard.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    text: 'Text',
    steps,
    image: {
      id: 1,
      alt: 'Image alt text',
      img: { data: storybookStrapiCoverMock },
    },
    card: {
      id: 1,
      title: 'Title',
      text: 'Text',
      button: { id: 1, text: 'Button', url: 'https://tree.ly' },
      shapes: [
        {
          id: 1,
          alt: 'Shape 1',
          img: { data: storybookStrapiGradientBottomUpMock },
        },
        {
          id: 2,
          alt: 'Shape 2',
          img: { data: storybookStrapiGradientTopDownMock },
        },
      ],
    },
  },
};
