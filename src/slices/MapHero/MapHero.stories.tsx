import { StoryFn, Meta } from '@storybook/react';

import {
  storybookStrapiGradientBottomUpMock,
  storybookStrapiMapMock,
} from '@/test/storybookMocks/storybookStrapiMedia';
import MapHero from '.';

export default {
  title: 'sections/MapHero',
  component: MapHero,
} as Meta<typeof MapHero>;

const Template: StoryFn<typeof MapHero> = (args) => <MapHero {...args} />;

export const Minimal = Template.bind({});
Minimal.args = {
  slice: {
    title: 'Title',
    map: { id: 1, alt: 'Map alt text', img: { data: storybookStrapiMapMock } },
    mobileMap: {
      id: 1,
      alt: 'Mobile map alt text',
      img: { data: storybookStrapiMapMock },
    },
  },
};

export const WithTagline = Template.bind({});
WithTagline.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    map: { id: 1, alt: 'Map alt text', img: { data: storybookStrapiMapMock } },
    mobileMap: {
      id: 1,
      alt: 'Mobile map alt text',
      img: { data: storybookStrapiMapMock },
    },
  },
};

export const WithTaglineAndSubTitle = Template.bind({});
WithTaglineAndSubTitle.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Text',
    map: { id: 1, alt: 'Map alt text', img: { data: storybookStrapiMapMock } },
    mobileMap: {
      id: 1,
      alt: 'Mobile map alt text',
      img: { data: storybookStrapiMapMock },
    },
  },
};

export const WithButton = Template.bind({});
WithButton.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Text',
    buttons: [{ id: 1, text: 'Button', url: 'https://tree.ly' }],
    map: { id: 1, alt: 'Map alt text', img: { data: storybookStrapiMapMock } },
    mobileMap: {
      id: 1,
      alt: 'Mobile map alt text',
      img: { data: storybookStrapiMapMock },
    },
  },
};

export const WithTwoButtons = Template.bind({});
WithTwoButtons.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Text',
    buttons: [
      { id: 1, text: 'Button 1', url: 'https://tree.ly' },
      { id: 2, text: 'Button 2', url: 'https://tree.ly' },
    ],
    map: { id: 1, alt: 'Map alt text', img: { data: storybookStrapiMapMock } },
    mobileMap: {
      id: 1,
      alt: 'Mobile map alt text',
      img: { data: storybookStrapiMapMock },
    },
  },
};

export const WithShape = Template.bind({});
WithShape.args = {
  slice: {
    tagline: 'Tagline',
    title: 'Title',
    subTitle: 'Text',
    buttons: [{ id: 1, text: 'Button', url: 'https://tree.ly' }],
    shape: {
      id: 1,
      alt: 'Shape',
      img: { data: storybookStrapiGradientBottomUpMock },
    },
    map: { id: 1, alt: 'Map alt text', img: { data: storybookStrapiMapMock } },
    mobileMap: {
      id: 1,
      alt: 'Mobile map alt text',
      img: { data: storybookStrapiMapMock },
    },
  },
};
