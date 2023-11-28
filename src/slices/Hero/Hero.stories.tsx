import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import {
  storybookStrapiCoverMock,
  storybookStrapiGradientBottomUpMock,
} from '../../test/storybookMocks/storybookStrapiMedia';
import Hero from '.';

export default {
  title: 'slices/Hero',
  component: Hero,
} as Meta<typeof Hero>;

const Template: StoryFn<typeof Hero> = (args) => <Hero {...args} />;

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    subTitle: 'Sub title',
    textAlign: 'center',
    additionalButtons: [],
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    textAlign: 'center',
    additionalButtons: [],
  },
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    textAlign: 'center',
    button: {
      id: 1,
      text: 'Button',
      url: 'https://tree.ly',
    },
    additionalButtons: [],
  },
};

export const WithAdditionalButton = Template.bind({});
WithAdditionalButton.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    textAlign: 'center',
    button: {
      id: 1,
      text: 'Button',
      url: 'https://tree.ly',
    },
    additionalButtons: [
      {
        button: {
          id: 1,
          text: 'Button Right',
          url: 'https://tree.ly',
        },
        variant: 'outline',
      },
    ],
  },
};

export const WithImage = Template.bind({});
WithImage.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    textAlign: 'center',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
    additionalButtons: [],
  },
};

export const TextAlignLeft = Template.bind({});
TextAlignLeft.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    textAlign: 'left',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
    additionalButtons: [],
  },
};

export const TextAlignLeftWithShape = Template.bind({});
TextAlignLeftWithShape.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    textAlign: 'left',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
    shape: {
      id: 1,
      alt: 'Shape alt text',
      img: { data: storybookStrapiGradientBottomUpMock },
    },
    additionalButtons: [],
  },
};
