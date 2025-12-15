import React from 'react';
import { StoryFn, Meta } from '@storybook/nextjs';

import { storybookStrapiCoverMock } from '../../test/storybookMocks/storybookStrapiMedia';
import SmallHero from '.';

export default {
  title: 'slices/SmallHero',
  component: SmallHero,
} as Meta<typeof SmallHero>;

const Template: StoryFn<typeof SmallHero> = (args) => <SmallHero {...args} />;

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
  },
  theme: 'dark',
};

export const WithSubTitle = Template.bind({});
WithSubTitle.args = {
  slice: {
    title: 'Title',
    subTitle: 'Sub title',
  },
  theme: 'dark',
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
  },
  theme: 'dark',
};

export const WithImage = Template.bind({});
WithImage.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
  },
  theme: 'dark',
};

export const WithImageGradient = Template.bind({});
WithImageGradient.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
    gradient: true,
  },
  theme: 'dark',
};

export const WithTags = Template.bind({});
WithTags.args = {
  slice: {
    tags: [
      { id: 1, text: 'Tag 1', colorPalette: 'green' },
      { id: 2, text: 'Tag 2', colorPalette: 'gray' },
    ],
    title: 'Title',
    subTitle: 'Sub title',
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
  },
  theme: 'dark',
};

export const WithTagsAndButton = Template.bind({});
WithTagsAndButton.args = {
  slice: {
    tags: [
      { id: 1, text: 'Tag 1', colorPalette: 'green' },
      { id: 2, text: 'Tag 2', colorPalette: 'gray' },
    ],
    title: 'Title',
    subTitle: 'Sub title',
    button: {
      id: 1,
      text: 'Button',
      url: 'https://tree.ly',
    },
    image: {
      id: 1,
      alt: 'Alt text',
      img: { data: storybookStrapiCoverMock },
    },
  },
  theme: 'dark',
};

export const LightTheme = Template.bind({});
LightTheme.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Sub title',
  },
  theme: 'light',
};

export const LightThemeWithTagsAndButton = Template.bind({});
LightThemeWithTagsAndButton.args = {
  slice: {
    tags: [
      { id: 1, text: 'Tag 1', colorPalette: 'green' },
      { id: 2, text: 'Tag 2', colorPalette: 'blue' },
    ],
    title: 'Title',
    subTitle: 'Sub title',
    button: {
      id: 1,
      text: 'Button',
      url: 'https://tree.ly',
    },
  },
  theme: 'light',
};
